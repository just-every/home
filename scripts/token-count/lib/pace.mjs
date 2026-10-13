// Keeps a scan polite on a shared machine: before each file and after each
// chunk it checks the one-minute load average and waits while it is above the
// limit (36 on the Mac by the owner's rule; the caller sets it per machine).
import os from 'node:os';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export function createPace(maxLoad, log) {
  let lastCheck = 0;
  let waitedMs = 0;
  async function pace() {
    const now = Date.now();
    if (now - lastCheck < 2000) return;
    lastCheck = now;
    let announced = false;
    while (os.loadavg()[0] > maxLoad) {
      if (!announced) {
        log(`load ${os.loadavg()[0].toFixed(1)} is above ${maxLoad}; pausing`);
        announced = true;
      }
      await sleep(15000);
      waitedMs += 15000;
    }
    if (announced) log(`load ${os.loadavg()[0].toFixed(1)}; resuming`);
  }
  pace.waitedMs = () => waitedMs;
  return pace;
}
