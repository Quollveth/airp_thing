export type Regen = {
  value: number;
  condition: {
    stat: string;
    operation: "greater" | "less";
    value: number;
  };
};

export type Stat = {
  name: string;
  description: string;
  min: number;
  max: number;
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
};
