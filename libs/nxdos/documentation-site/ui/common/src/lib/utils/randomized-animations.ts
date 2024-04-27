import { Dispatch, SetStateAction } from 'react';

interface RandomizedTimerWithSkewedNormalDistributionAndCutoff {
  duration?: number; // ms
  mean: number; ////// ms
  stdDev: number; //// ms
  skew: number; ////// α coefficient - unitless
  minRange: number; // ms
  maxRange: number; // ms
}

export interface AnimationTimer
  extends RandomizedTimerWithSkewedNormalDistributionAndCutoff {
  callback: Dispatch<SetStateAction<number>>;
}

export interface DelayTimer
  extends RandomizedTimerWithSkewedNormalDistributionAndCutoff {
  callback: Dispatch<SetStateAction<string>>;
}

export const iterateTimer = (
  randomizedTimer: RandomizedTimerWithSkewedNormalDistributionAndCutoff
) => {
  randomizedTimer.duration = Math.round(
    Math.min(
      Math.max(
        randomizedTimer.minRange,
        randomSkewNormal({
          mean: randomizedTimer.mean,
          stdDev: randomizedTimer.stdDev,
          skew: randomizedTimer.skew,
        })
      ),
      randomizedTimer.maxRange
    )
  );
};

// refer to the atomic object blog for this conveniently
// simple implementation of skewed normal distribution pdf
// https://spin.atomicobject.com/2019/09/30/skew-normal-prng-javascript/

export const randomSkewNormal = ({
  mean,
  stdDev,
  skew = 0,
  rng = Math.random,
}: {
  mean: number;
  stdDev: number;
  skew: number;
  rng?: () => number;
}) => {
  const [ξ, ω, α] = [mean, stdDev, skew];
  // ξ, location (mean)
  // ω, scale (standard deviation)
  // α, shape (skewness)
  // rng, random number generator

  const [u0, v] = randomNormals(rng);
  /* istanbul ignore next */
  if (α === 0) {
    return ξ + ω * u0;
  }
  const 𝛿 = α / Math.sqrt(1 + α * α);
  const u1 = 𝛿 * u0 + Math.sqrt(1 - 𝛿 * 𝛿) * v;
  const z = u0 >= 0 ? u1 : -u1;
  return ξ + ω * z;
};

export const randomNormals = (rng: () => number) => {
  // Box muller transform
  let [u1, u2] = [0, 0];
  while (u1 === 0) u1 = rng();
  while (u2 === 0) u2 = rng();
  const R = Math.sqrt(-2.0 * Math.log(u1));
  const Θ = 2.0 * Math.PI * u2;
  return [R * Math.cos(Θ), R * Math.sin(Θ)];
};
