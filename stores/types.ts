//   __      _____  ___ _    ___    _______   _____ ___ ___
//   \ \    / / _ \| _ \ |  |   \  |_   _\ \ / / _ \ __/ __|
//    \ \/\/ / (_) |   / |__| |) |   | |  \ V /|  _/ _|\__ \
//     \_/\_/ \___/|_|_\____|___/    |_|   |_| |_| |___|___/

export type Comparison = "greater" | "less" | "greater_equal" | "less_equal";
export type Regen = {
  value: number;
  condition: {
    stat: string;
    operation: Comparison;
    value: number;
  };
};

export type Stat = {
  name: string;
  description: string;
  min: number;
  max: number;
  starting: number;
  thresholds: {
    value: number;
    description: string;
  }[];
  regens: Regen[];
};
export type Entity = {
  name: string;
  description: string;
  tags: string[];
};

export type World = {
  stats: Stat[];
  entities: Entity[];
  player: string;
  world: string;
  location: string;
  title: string;
  description: string;
  CW: string[];
};

//      _   ___   _______   _____ ___ ___
//     /_\ |_ _| |_   _\ \ / / _ \ __/ __|
//    / _ \ | |    | |  \ V /|  _/ _|\__ \
//   /_/ \_\___|   |_|   |_| |_| |___|___/

export type Endpoint = {
  modelName: string;
  endpoint: string;
  token: string;
};

export type Agent = {
  Endpoint: Endpoint;
  SystemPrompts: string[];
};
