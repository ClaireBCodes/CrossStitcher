import { DMCGrid } from './DMCGrid';
import dmcData from './assets/dmc.json';

export default {
  title: 'Example/DMC/Grid',
  component: DMCGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export const Grid = {
  args: {
    colours: dmcData,
  },
};