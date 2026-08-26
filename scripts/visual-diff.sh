#!/usr/bin/env bash
# Compare two screenshot sets. Prints pixels changed per page; exits 1 if any exceed the threshold.
# Usage: scripts/visual-diff.sh <beforeDir> <afterDir> [maxChangedPixels]
before=$1; after=$2; max=${3:-0}; fail=0
for a in "$before"/*.png; do
  n=$(basename "$a"); b="$after/$n"
  if [ ! -f "$b" ]; then echo "MISSING $n"; fail=1; continue; fi
  ha=$(identify -format %h "$a"); hb=$(identify -format %h "$b")
  if [ "$ha" != "$hb" ]; then echo "HEIGHT  $n  $ha -> $hb"; fail=1; continue; fi
  d=$(compare -metric AE -fuzz 2% "$a" "$b" /dev/null 2>&1 | tr -d '\n' | cut -d' ' -f1)
  if [ "${d%.*}" -gt "$max" ]; then echo "DIFF    $n  $d px"; fail=1; else echo "same    $n"; fi
done
exit $fail
