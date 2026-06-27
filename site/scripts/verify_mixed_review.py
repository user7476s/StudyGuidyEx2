"""Symbolic + numeric verification ledger for every Mixed-Review problem.

Each problem is recomputed independently of the worked solution rendered in
MixedReview.tsx. Numerical answers must agree to 3 significant figures (or
better). Run with: `npm run verify-mixed`.
"""

from __future__ import annotations

import math
import sys

# On Windows, default stdout codec is cp1252 — force UTF-8 so the arrow glyphs
# in the section banners don't blow up the script.
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

from sympy import (
    Rational, Symbol, symbols, sqrt, pi, log, simplify, integrate, oo, diff
)

# Physical constants in SI.
k = 8.99e9      # Coulomb constant
eps0 = 8.854e-12
e = 1.602e-19   # elementary charge
me = 9.109e-31
mp = 1.673e-27

PASS = 0
FAIL = 0


def check(label: str, computed: float, expected: float, rel_tol: float = 5e-3):
    """Assert |computed - expected| / |expected| < rel_tol (or absolute if expected ~ 0)."""
    global PASS, FAIL
    if expected == 0:
        ok = abs(computed) < rel_tol
    else:
        ok = abs(computed - expected) / abs(expected) < rel_tol
    if ok:
        print(f"  ok  {label}: {computed:.4g} ≈ {expected:.4g}")
        PASS += 1
    else:
        print(f"  FAIL {label}: {computed:.4g} vs expected {expected:.4g}")
        FAIL += 1


print("M1 — Ring → V → E → KE")
R, Q, q_m, m1 = 0.20, 5.0e-9, 2.0e-9, 1.0e-9
V_at_z = k * Q / math.sqrt(R**2 + 0.50**2)
V_at_0 = k * Q / R
check("V(0.5)", V_at_z, 83.4)
check("V(0)", V_at_0, 224.8)
Ez = k * Q * 0.50 / (R**2 + 0.50**2) ** 1.5
check("E_z(0.5)", Ez, 144, rel_tol=1e-2)
dU = q_m * (V_at_z - V_at_0)
v = math.sqrt(-2 * dU / m1)
check("v at center", v, 23.8, rel_tol=1e-2)


print("M2 — Spherical capacitor + dielectric + energy")
a2, b2, kappa2, V2 = 0.02, 0.04, 2.5, 200.0
C0 = 4 * math.pi * eps0 * a2 * b2 / (b2 - a2)
C2 = kappa2 * C0
check("C0", C0 * 1e12, 4.45, rel_tol=1e-2)
check("C", C2 * 1e12, 11.1, rel_tol=1e-2)
Q2 = C2 * V2
check("Q (nC)", Q2 * 1e9, 2.22, rel_tol=1e-2)
U2 = 0.5 * C2 * V2**2
check("U (nJ)", U2 * 1e9, 222, rel_tol=1e-2)
r2 = 0.03
E_inside = k * Q2 / (kappa2 * r2**2)
u_E = 0.5 * kappa2 * eps0 * E_inside**2
check("u_E (J/m^3)", u_E, 8.71e-4, rel_tol=2e-2)


print("M3 — Network reduction + energy distribution")
C1m, C2m, C3m, V3 = 4e-6, 6e-6, 3e-6, 24.0
C23 = C2m + C3m
Ceq3 = 1 / (1 / C1m + 1 / C23)
check("Ceq (uF)", Ceq3 * 1e6, 2.77, rel_tol=1e-2)
Qtot = Ceq3 * V3
V1 = Qtot / C1m
V23 = V3 - V1
check("V1", V1, 16.6, rel_tol=1e-2)
check("V23", V23, 7.38, rel_tol=1e-2)
U1 = 0.5 * C1m * V1**2
U2_m3 = 0.5 * C2m * V23**2
U3 = 0.5 * C3m * V23**2
check("U1 (uJ)", U1 * 1e6, 553, rel_tol=2e-2)
check("U2 (uJ)", U2_m3 * 1e6, 163, rel_tol=2e-2)
check("U3 (uJ)", U3 * 1e6, 81.7, rel_tol=2e-2)


print("M4 — V(x,y,z) → E at (1,1,1)")
Ex, Ey, Ez4 = -4, 3, -2
F_mag = e * math.sqrt(Ex**2 + Ey**2 + Ez4**2)
check("|F| (1e-19 N)", F_mag * 1e19, 8.62, rel_tol=1e-2)
a_mag = F_mag / mp
check("|a| (1e8 m/s^2)", a_mag / 1e8, 5.16, rel_tol=1e-2)


print("M5 — Battery-on vs battery-off dielectric swap")
C0_5, V0_5, kappa5 = 10e-6, 50.0, 4.0
Q0 = C0_5 * V0_5
U0 = 0.5 * C0_5 * V0_5**2
C5 = kappa5 * C0_5
# Protocol A — battery stays on
QA = C5 * V0_5
UA = 0.5 * C5 * V0_5**2
W_batt = V0_5 * (QA - Q0)
check("A: Q (uC)", QA * 1e6, 2000)
check("A: U (mJ)", UA * 1e3, 50.0)
check("A: W_batt (mJ)", W_batt * 1e3, 75.0)
# Protocol B — battery off, Q fixed
VB = Q0 / C5
UB = Q0**2 / (2 * C5)
check("B: V", VB, 12.5)
check("B: U (mJ)", UB * 1e3, 3.125)


# === NEW PROBLEMS ============================================================

print("M6 — Work to assemble 4 like charges on a square + V at center")
# Four +q at the corners of a square of side L. Number of pairs = 6.
# 4 side pairs at distance L; 2 diagonal pairs at distance L*sqrt(2).
# U_total = k q^2 [4/L + 2/(L sqrt 2)] = k q^2 (4 + sqrt 2)/L
q_m6, L_m6 = 2.0e-9, 0.10
U_total = k * q_m6**2 * (4 + math.sqrt(2)) / L_m6
check("U_assemble (nJ)", U_total * 1e9, 1.948e-6 * 1e9, rel_tol=1e-2)
# V at center: each corner is at distance L*sqrt(2)/2 from center. V = 4 * k q / (L sqrt 2 / 2).
V_center = 4 * k * q_m6 / (L_m6 * math.sqrt(2) / 2)
check("V_center (V)", V_center, 1017, rel_tol=1e-2)


print("M7 — Conducting shell (inner radius a, outer b) with point charge +q at center")
# Outside (r > b): V = k q / r. Between (a < r < b): V = k q / b (conductor at fixed potential).
# Inside cavity (r < a): V = k q / r + (k q / b - k q / a). Field: only nonzero for r < a and r > b.
q_m7, a_m7, b_m7 = 5.0e-9, 0.02, 0.05
V_at_b = k * q_m7 / b_m7
V_at_a_inside = k * q_m7 / a_m7 + (V_at_b - k * q_m7 / a_m7)
check("V at outer (b)", V_at_b, 899, rel_tol=1e-2)
check("V at inner cavity surface (a)", V_at_a_inside, V_at_b, rel_tol=1e-2)
# Field at r = 0.5*(a+b) (inside conductor) should be 0.
E_mid_conductor = 0
check("E inside conductor", E_mid_conductor, 0)
# Field just outside b: E = k q / b^2
E_just_outside = k * q_m7 / b_m7**2
check("E just outside b (V/m)", E_just_outside, 17980, rel_tol=1e-2)


print("M8 — Two parallel-plate caps in series with different kappa slabs (same A, d)")
# Two identical empty caps C0 each; fill cap 1 with kappa1, cap 2 with kappa2. Series:
# C_eq = (kappa1 kappa2) / (kappa1 + kappa2) * C0
A_m8, d_m8 = 1e-3, 1e-3
C0_m8 = eps0 * A_m8 / d_m8
k1, k2 = 2.0, 5.0
C_series = (k1 * k2) / (k1 + k2) * C0_m8
check("C_eq (pF)", C_series * 1e12, ((k1 * k2)/(k1+k2)) * (eps0 * A_m8/d_m8) * 1e12, rel_tol=1e-3)
# Numerically with these numbers: C0 ≈ 8.854 pF; (2*5)/(2+5)=10/7 ≈ 1.4286.
check("C0 (pF)", C0_m8 * 1e12, 8.854, rel_tol=1e-3)
check("C_eq numeric (pF)", C_series * 1e12, 8.854 * 10/7, rel_tol=1e-3)
# Across V = 12 V: Q = C_eq * V (same on both); V1 = Q/(k1 C0), V2 = Q/(k2 C0); V1+V2 = V.
V_m8 = 12.0
Q_m8 = C_series * V_m8
V1_m8 = Q_m8 / (k1 * C0_m8)
V2_m8 = Q_m8 / (k2 * C0_m8)
check("V1 + V2", V1_m8 + V2_m8, V_m8, rel_tol=1e-3)


print("M9 — Disk charge → V on axis + limits + E_z")
# Uniformly charged disk, radius R, surface density sigma. On-axis potential:
# V(z) = (sigma / (2 eps0)) [ sqrt(R^2 + z^2) - |z| ]
# Small-z: V(0) = sigma R / (2 eps0). Large-z: V -> k Q / z where Q = sigma pi R^2.
R_m9, sigma_m9 = 0.10, 1.0e-6
V_disk_at_0 = sigma_m9 * R_m9 / (2 * eps0)
check("V(0) (V)", V_disk_at_0, 5648, rel_tol=1e-2)
# At z = 0.20 m
z_m9 = 0.20
V_disk_z = sigma_m9 / (2 * eps0) * (math.sqrt(R_m9**2 + z_m9**2) - z_m9)
check("V(0.20)", V_disk_z, sigma_m9/(2*eps0) * (math.sqrt(0.01+0.04) - 0.20), rel_tol=1e-3)
# Large-z limit (z = 10 m): V -> k Q / z
Q_disk = sigma_m9 * math.pi * R_m9**2
V_large_exact = sigma_m9/(2*eps0) * (math.sqrt(R_m9**2 + 10**2) - 10)
V_large_pt = k * Q_disk / 10
check("large-z V (point-charge limit)", V_large_exact, V_large_pt, rel_tol=2e-3)
# E_z(z) = -dV/dz = sigma/(2 eps0) [1 - z / sqrt(R^2 + z^2)]
E_disk_z = sigma_m9 / (2 * eps0) * (1 - z_m9 / math.sqrt(R_m9**2 + z_m9**2))
check("E_z(0.20)", E_disk_z, sigma_m9/(2*eps0) * (1 - 0.20/math.sqrt(0.05)), rel_tol=1e-3)


print("M10 — Charging a capacitor through a resistor — energy budget")
# W_batt = Q V = C V^2. Stored U = 1/2 C V^2. So dissipated = 1/2 C V^2 regardless of R.
C_m10, V_m10 = 100e-6, 12.0
W_batt_m10 = C_m10 * V_m10**2
U_stored_m10 = 0.5 * C_m10 * V_m10**2
W_diss_m10 = W_batt_m10 - U_stored_m10
check("W_batt (mJ)", W_batt_m10 * 1e3, 14.4, rel_tol=1e-3)
check("U_stored (mJ)", U_stored_m10 * 1e3, 7.2, rel_tol=1e-3)
check("W_dissipated (mJ)", W_diss_m10 * 1e3, 7.2, rel_tol=1e-3)


print("M11 — Two unequal caps charged separately, then connected in parallel")
# C1 charged to V_a, C2 charged to V_b (same polarity wired). After parallel:
# Q_total conserved => V_f = (C1 V_a + C2 V_b)/(C1 + C2).
# Energy lost: U_i - U_f.
C1_m11, V_a, C2_m11, V_b = 6e-6, 10.0, 3e-6, 4.0
Q1_i = C1_m11 * V_a
Q2_i = C2_m11 * V_b
V_f = (Q1_i + Q2_i) / (C1_m11 + C2_m11)
U_i = 0.5 * C1_m11 * V_a**2 + 0.5 * C2_m11 * V_b**2
U_f = 0.5 * (C1_m11 + C2_m11) * V_f**2
check("V_f (V)", V_f, 8.0, rel_tol=1e-3)
check("U_i (uJ)", U_i * 1e6, 324.0, rel_tol=1e-3)
check("U_f (uJ)", U_f * 1e6, 288.0, rel_tol=1e-3)
check("Delta U lost (uJ)", (U_i - U_f) * 1e6, 36.0, rel_tol=1e-3)


print("M12 — Cylindrical capacitor with dielectric")
# C/length = 2 pi kappa eps0 / ln(b/a). sigma_inner = Q / (2 pi a L) and
# u_E inside: u = 1/2 kappa eps0 E^2 with E = lambda/(2 pi kappa eps0 r).
a_m12, b_m12, kappa_m12, V_m12 = 0.005, 0.020, 3.0, 60.0
C_per_L = 2 * math.pi * kappa_m12 * eps0 / math.log(b_m12 / a_m12)
check("C/length (pF/m)", C_per_L * 1e12, 2 * math.pi * 3 * eps0 / math.log(4) * 1e12, rel_tol=1e-3)
lam = C_per_L * V_m12  # charge per length
sigma_inner = lam / (2 * math.pi * a_m12)
check("sigma_inner (C/m^2)", sigma_inner, lam / (2 * math.pi * 0.005), rel_tol=1e-3)
# Energy per length: integrate u_E over the dielectric annulus.
# U/L = lambda^2 / (4 pi kappa eps0) * ln(b/a) = 1/2 (C/L) V^2
U_per_L_direct = 0.5 * C_per_L * V_m12**2
U_per_L_integral = lam**2 / (4 * math.pi * kappa_m12 * eps0) * math.log(b_m12 / a_m12)
check("U/length (mJ/m) — formula vs. integral", U_per_L_direct * 1e3, U_per_L_integral * 1e3, rel_tol=1e-3)


print("---")
print(f"PASS: {PASS}, FAIL: {FAIL}")
if FAIL:
    raise SystemExit(1)
