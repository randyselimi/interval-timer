import * as db from '$lib/server/tile-database.js';

export function load() {
  return {
    tiles: db.getTiles()
  };
}

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    // const timerProps: TimerProps = {
    //   name: data.get('name'),
    //   duration: data.get('duration'),
    //   sound: data.get('sound'),
    //   x: data.get('x'),
    //   y: data.get('y')
    // };

    // db.createTimer(timerProps);
  }
};
