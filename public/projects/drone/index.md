# DIY Drone


During the summer of 2020, I built a custom quadcopter from scratch for FPV flying and aerial photography. Below is a concise breakdown of the build.

---

## Overview

A complete DIY quadcopter build featuring custom 3D-printed components, brushless motors, and FPV capabilities. This project explores the fundamentals of drone aerodynamics, flight control systems, and radio communications.

## Specifications

- **Frame**: Custom 250mm carbon fiber/3D-printed hybrid
- **Motors**: 2300KV brushless outrunners
- **Flight Controller**: F4 with BetaFlight firmware
- **Camera**: 800TVL FPV camera + GoPro mount
- **Battery**: 4S 1500mAh LiPo
- **Flight Time**: ~12-15 minutes
- **Weight**: 485g (without battery)

{{< gallery-image src="/images/drone/Drone2.jpeg" title="Drone — full BOM" caption="Bill of Materials (excerpt)" >}}

## Build Process

### Frame Assembly

I started with a carbon-fiber base plate for rigidity and vibration damping. The arms are 3D-printed in reinforced PLA to balance weight and strength.

{{< gallery-image src="/images/drone/Drone4.jpeg" title="Frame close-up" caption="Frame close-up" >}}

### Electronics Integration

The flight controller runs BetaFlight for precise control and tuning. I wired a 4-in-1 ESC to minimize clutter and soldered XT60 connectors for quick battery swaps.

{{< gallery-image src="/images/drone/Drone1.jpeg" title="Flight controller" caption="M4-based flight controller" >}}


**Wiring diagram:**
```
Battery → PDB → FC (5V) → Receiver
       ↓
       ESC → Motors (x4)
       ↓
       FPV Camera → VTX → Antenna
```

### Configuration & Tuning

PID tuning in BetaFlight took several sessions to get smooth, responsive flight. Key settings:

- **P**: 45, **I**: 70, **D**: 32 (roll/pitch)
- **RC Rate**: 1.8, **Expo**: 0.15
- **Camera Angle**: 35°

{{< gallery-image src="/images/drone/Drone5.jpeg" title="In-flight" caption="In-flight photo" >}}


### Test Flights

Initial flights showed oscillation at high throttle; I resolved this by reducing P gains and checking motor balance. After tuning, the quadcopter flew stably and responsively.

Here is a short demo video — let's see it in action:

{{< youtube lUMkGLwBifU >}}

## Key Learnings

**What worked well**: Hybrid frame design saved weight while maintaining strength. BetaFlight's OSD is invaluable for real-time telemetry.

**Challenges**: Motor vibrations affecting FPV feed required dampening with rubber grommets. Soldering the 4-in-1 ESC in tight quarters was tricky.

**Next iteration**: Better antenna placement, GPS module for position hold, and lighter frame design.

## Parts List

| Component | Model | Cost |
|-----------|-------|------|
| Motors | EMAX RS2205 2300KV | $60 |
| ESC | 4-in-1 30A BLHeli_S | $35 |
| Flight Controller | Matek F405 | $45 |
| Frame | DIY Carbon + PLA | $25 |
| FPV Camera | Foxeer Predator | $30 |
| VTX | TBS Unify Pro | $35 |
| Props | HQ 5x4.3 (3 sets) | $15 |
| Battery | 4S 1500mAh | $25 |
| **Total** | | **~$270** |

---

