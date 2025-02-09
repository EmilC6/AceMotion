import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/kontakt` | `/(tabs)/o_nama` | `/(tabs)/postavke` | `/(tabs)/pravila` | `/_sitemap` | `/kontakt` | `/napredni` | `/o_nama` | `/pocetnici` | `/postavke` | `/pravila`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
