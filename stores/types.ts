export type Stat = {
  name: string;
  description: string;
  min: number;
  max: number;
  thresholds: {
    value: number;
    description: string;
  }[];
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
};
