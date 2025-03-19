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
  description: string;
  CW: string[];
};
