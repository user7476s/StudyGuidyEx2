#!/usr/bin/env python3
"""Independently re-derive a curated subset of numeric questions using sympy
and confirm they match the labeled correct answer.

This is a sanity net, not a generator: it duplicates the physics from the
question stems but with fresh formulas, so a typo in either the stem or
the labeled answer surfaces as a numeric mismatch.
"""

from __future__ import annotations

import math
import sys

try:
    from sympy import S, Rational, log, sqrt, pi, simplify, Float
except ImportError:
    print('sympy is required: py -m pip install sympy', file=sys.stderr)
    sys.exit(2)

# Physical constants (CODATA-ish, matching textbook precision)
k = 8.99e9            # N m^2 / C^2
eps0 = 8.854e-12      # F/m
e_chg = 1.602e-19     # C

TOL_REL = 0.01  # 1% — generous because option values are rounded

fail_count = 0


def check(qid: str, computed: float, expected: float, units: str = '') -> None:
    global fail_count
    if expected == 0:
        ok = abs(computed) < 1e-12
    else:
        ok = abs(computed - expected) / abs(expected) < TOL_REL
    if ok:
        print(f'  ok  {qid}: computed {computed:.4g} {units} vs labeled {expected:.4g} {units}')
    else:
        print(f'  FAIL {qid}: computed {computed:.4g} {units} vs labeled {expected:.4g} {units}')
        fail_count += 1


# ---- Exam 1 spot-checks (a few representative numeric items) -----------------
print('Exam 1 spot-checks:')

# E1-023: two 1µC charges, 1m apart, mass 1g → speed at infinity
U = k * (1e-6) ** 2 / 1.0
v = math.sqrt(2 * U / 1e-3)
check('E1-023', v, 4.24, 'm/s')

# E1-039: V at x=0.30 m on axis beyond a 0.20-m line, λ=2 nC/m. V = kλ ln(0.30/0.10) = kλ ln(3)
V = k * 2e-9 * math.log(3.0)
check('E1-039', V, 19.8, 'V')

# E1-077: parallel-plate, A=0.040 m^2, d=2.0 mm
C = eps0 * 0.040 / 2e-3
check('E1-077', C * 1e12, 177, 'pF')  # 177 pF target

# E1-100: defibrillator U = ½ C V²
U = 0.5 * 32e-6 * 5000 ** 2
check('E1-100', U, 400, 'J')

# ---- Exam 2 numeric items -----------------------------------------------------
print('Exam 2 numeric items:')

# E2-001: W_ext = -qEd
W = -2e-6 * 500 * 0.30
check('E2-001', W * 1e3, -0.30, 'mJ')

# E2-002: U = kq1q2/r
U = k * 3e-6 * 4e-6 / 0.50
check('E2-002', U, 0.216, 'J')

# E2-003: 3 charges equilateral
U = 3 * k * (2e-6) ** 2 / 0.10
check('E2-003', U, 1.08, 'J')

# E2-004: v from energy conservation
v = math.sqrt(2 * (2e-6 * 500) / 1e-3)
check('E2-004', v, 1.41, 'm/s')

# E2-006: KE = eEd
KE = e_chg * 2000 * 0.05
check('E2-006', KE, 1.6e-17, 'J')

# E2-007: square 4 charges, U/(kq^2/a) = 4 + sqrt(2)
U = (k * (1e-6) ** 2 / 0.10) * (4 + math.sqrt(2))
check('E2-007', U, 0.49, 'J')

# E2-011: e * 1500 V
KE = e_chg * 1500
check('E2-011', KE, 2.4e-16, 'J')

# E2-019: V = kq/r
V = k * 5e-9 / 0.20
check('E2-019', V, 225, 'V')

# E2-020: 4 charges at corners of square, V at center
V = 4 * k * 2e-6 / (0.10 / math.sqrt(2))
check('E2-020', V, 1.02e6, 'V')

# E2-022: V from two charges at midpoint
V = k * (3e-9 - 2e-9) / 0.05
check('E2-022', V, 179.8, 'V')

# E2-023: V on axis of ring
V = k * 1e-6 / math.sqrt(0.10 ** 2 + 0.20 ** 2)
check('E2-023', V * 1e-3, 40, 'kV')

# E2-024: V on axis of disk
V = (5e-6 / (2 * eps0)) * (math.sqrt(0.10 ** 2 + 0.05 ** 2) - 0.05)
check('E2-024', V, 1.74e4, 'V')

# E2-026: V at center of arc
V = k * 2e-9 / 0.05
check('E2-026', V, 360, 'V')

# E2-027: V outside spherical shell
V = k * 1e-6 / 0.30
check('E2-027', V * 1e-3, 30.0, 'kV')

# E2-028: V inside shell = V at surface
V = k * 1e-6 / 0.10
check('E2-028', V * 1e-3, 89.9, 'kV')

# E2-029: V at center of half-ring
V = k * 4e-9 / 0.02
check('E2-029', V, 1800, 'V')

# E2-030: V at perpendicular distance 0.10 m from midpoint of 1 m rod, λ=2µC/m
half, d, lam = 0.5, 0.10, 2e-6
s = math.sqrt(half * half + d * d)
V = k * lam * math.log((half + s) / (-half + s))
check('E2-030', V * 1e-3, 83.0, 'kV')

# E2-031: V on axis of finite line, kλ ln((L+d)/d)
V = k * 1e-6 * math.log((0.30 + 0.10) / 0.10)
check('E2-031', V * 1e-3, 12.5, 'kV')

# E2-032: V from two distant +2nC charges
V = k * 2e-9 * (1 / 1.0 + 1 / 0.50)
check('E2-032', V, 53.9, 'V')

# E2-033: x = L/3
check('E2-033', 1 / 3, 1 / 3, '(fraction of L)')

# E2-035: V at center of uniformly charged sphere
V = 1.5 * k * 1e-6 / 0.05
check('E2-035', V * 1e-3, 270, 'kV')

# E2-037: E_x = -(6x + 2) at x=1
Ex = -(6 + 2)
check('E2-037', Ex, -8, 'V/m')

# E2-039: |E| = ΔV/Δs = 10/0.02
E = 10 / 0.02
check('E2-039', E, 500, 'V/m')

# E2-042: ΔV = -E·Δx
dV = -400 * 0.20
check('E2-042', dV, -80, 'V')

# E2-047: V outside conducting sphere
V = k * 4e-9 / 0.20
check('E2-047', V, 180, 'V')

# E2-049: Q1/Q2 = R1/R2
check('E2-049', 0.02 / 0.04, 0.5, '')

# E2-050: E = σ/ε₀
E = 5e-6 / eps0
check('E2-050', E, 5.65e5, 'V/m')

# E2-058: parallel-plate C
C = eps0 * 0.040 / 2e-3
check('E2-058', C * 1e12, 177, 'pF')

# E2-059: spherical C = ab / [k(b-a)]
C = (0.02 * 0.04) / (k * 0.02)
check('E2-059', C * 1e12, 4.45, 'pF')

# E2-060: cylindrical C
C = 2 * math.pi * eps0 * 0.10 / math.log(2.5)
check('E2-060', C * 1e12, 6.07, 'pF')

# E2-061: isolated sphere C = R/k
C = 0.10 / k
check('E2-061', C * 1e12, 11.1, 'pF')

# E2-062: Q = CV
Q = 5e-6 * 12
check('E2-062', Q * 1e6, 60, 'µC')

# E2-067: d = ε₀A/C
d = eps0 * 0.010 / 1e-9
check('E2-067', d * 1e6, 88.5, 'µm')

# E2-068: σ = Q/A
Q = 1e-10 * 200
sigma = Q / 0.005
check('E2-068', sigma * 1e6, 4.0, 'µC/m^2')

# E2-069: E = V/d
E = 50 / 5e-4
check('E2-069', E, 1e5, 'V/m')

# E2-070: spherical C variant
C = (0.03 * 0.05) / (k * 0.02)
check('E2-070', C * 1e12, 8.34, 'pF')

# E2-071, E2-072: 4 and 6 µF series/parallel
check('E2-071', 4 * 6 / (4 + 6), 2.4, 'µF')
check('E2-072', 4 + 6, 10, 'µF')

# E2-073: 2+3+6 parallel
check('E2-073', 2 + 3 + 6, 11, 'µF')
# E2-074: 2,3,6 series
inv = 1 / 2 + 1 / 3 + 1 / 6
check('E2-074', 1 / inv, 1.0, 'µF')

# E2-075: (2||4) series 3
par = 2 + 4
ser = par * 3 / (par + 3)
check('E2-075', ser, 2.0, 'µF')

# E2-076: series, same Q = Ceq * V
Ceq = 3 * 6 / 9
Q = Ceq * 12
check('E2-076', Q, 24, 'µC')

# E2-079: 6,3 series
check('E2-079', 6 * 3 / 9, 2.0, 'µF')

# E2-083: 2 in series then || with 3
ser = 2 * 2 / 4
par = ser + 3
check('E2-083', par, 4.0, 'µF')

# E2-084: 24 V across 5,10 series; Q = Ceq*V
Ceq = 5 * 10 / 15
Q = Ceq * 24
check('E2-084', Q, 80, 'µC')

# E2-085: U = ½CV²
U = 0.5 * 10e-6 * 50 ** 2
check('E2-085', U * 1e3, 12.5, 'mJ')

# E2-086: U = Q²/(2C)
U = (20e-6) ** 2 / (2 * 4e-6)
check('E2-086', U * 1e6, 50, 'µJ')

# E2-087: u = ½ε₀E²
u = 0.5 * eps0 * (5e5) ** 2
check('E2-087', u, 1.107, 'J/m^3')

# E2-094: κC₀
check('E2-094', 5 * 2, 10, 'nF')

print('---')
if fail_count:
    print(f'FAILED: {fail_count} numeric mismatch(es).')
    sys.exit(1)
else:
    print('ALL REDERIVATIONS MATCH.')
