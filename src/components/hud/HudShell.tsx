import MiniMap from './MiniMap';
import Telemetry from './Telemetry';
import TopBar from './TopBar';

export default function HudShell() {
  return (
    <>
      <TopBar />
      <MiniMap />
      <Telemetry />
    </>
  );
}
