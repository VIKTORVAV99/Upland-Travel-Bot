import type { CustomClient } from '../utils/customClient';

export interface Event {
  name: string;
  once?: boolean;
  execute: (client: CustomClient) => void;
}
