import { Effect, LogLevel, Logger, Scope, pipe } from "effect";

const setLogger = Logger.replace(Logger.defaultLogger, Logger.none);
//import { PrettyLogger } from "effect-log";
//const setLogger = PrettyLogger.layer();

export const runTestEffect = <E, A>(self: Effect.Effect<Scope.Scope, E, A>) =>
  pipe(
    self,
    Effect.provide(setLogger),
    Logger.withMinimumLogLevel(LogLevel.All),
    Effect.scoped,
    Effect.runPromise,
  );
