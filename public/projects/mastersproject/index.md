# MOSFET Lifetime Modeling - MSc Thesis w/ Ferrari


This post is a short recap of my master's thesis. It presents a MATLAB model to estimate the lifetime of high-power transistors for automotive applications, validated with field hardware data and recent research on silicon carbide power devices.
The full thesis is available on GitHub: https://github.com/matteototaro/Fatigue-Analysis-SiC-Power-Module/blob/main/Totaro_Matteo_MastersThesis.pdf — a Python implementation is available at https://github.com/matteototaro/sic-thermal-lifetime.

**Table of contents**

- [The Approach](#the-approach)
- [What's in the Code](#whats-in-the-code)
- [How the Model Works: The Physics Behind Lifetime Prediction](#how-the-model-works-the-physics-behind-lifetime-prediction)
- [Example](#example)
- [References](#references)

## Predicting Failure in SiC Power MOSFETs for Automotive Traction Inverters
Electric vehicles demand extreme performance from their power electronics. The silicon carbide (SiC) MOSFETs inside traction inverters switch thousands of times per second, endure temperature swings of 100°C or more, and must survive for the vehicle's lifetime. The question is: how long will they last?

For my master's thesis with Ferrari, I built a MATLAB model that answers this question. The goal: convert any racetrack profile into quantifiable cycles needed to estimate the lifetime of the power electronics inside a hybrid or electric Ferrari. The focus was on the power module inside the traction inverter—the component that makes or breaks the system.


### The Approach

The model works in three steps, starting with real vehicle data.

<div style="display: flex; gap: 2rem; align-items: flex-start;">
  <div style="flex: 1;">
First, given the electrical characteristics of the system and the racetrack profile—inverter voltage, current, switching frequency—it calculates total <strong>power loss</strong>. From there, using the thermal network of the power module, it estimates <strong>junction temperature</strong> through the electro-thermal analogy: thermal resistance maps to electrical resistance, heat flow maps to current.

Second, once junction temperature is known, the <strong>Rainflow algorithm</strong> extracts the real damage: thermal stress cycles. In power electronics, continuous temperature swings are what kills components. The algorithm counts <i>how many</i> temperature variations (ΔT) occur, <i>how large</i> they are, and <i>how long</i> they last (Δt).

Third, the model quantifies cumulative <strong>damage</strong> using Miner's Rule and acceleration factors from ECPE AQG 324 industry standards.
</div>
  <div style="flex: 1; margin: 0;">
    {{< gallery-image 
        src="/images/projects/test_flow.png"
        title="Test flow"
        caption="Test flow" >}}
  </div>
</div>

The models used to calculate the acceleration factor are Coffin Manson, Arrhenius and an on-time factor which are all three packed into the <strong>Norris-Landzberg Acceleration Factor (AF)</strong>.
The MOSFET's body diode enables real-time temperature sensing—no external sensors needed.

### What's in the Code

The MATLAB implementation handles electro-thermal modeling, stress counting, and lifetime prediction. Due to IP restrictions with Ferrari, I can't share the complete source, but the repository includes the methodology, key algorithms, and documentation.

The model bridges the gap between simulation and reality: it takes real vehicle data and outputs a failure prediction you can validate with power cycling tests.

## How the Model Works: The Physics Behind Lifetime Prediction

The README shows what the tool does. Here's how it actually works—the physics and mathematics that turn a driving profile into a failure prediction.

### The Core Problem: Temperature is Everything

Power semiconductor failure is fundamentally a thermal problem. Every time a MOSFET heats up and cools down, mechanical stress accumulates at material interfaces. After enough cycles, solder joints crack, wire bonds lift, and the device fails.

The challenge: junction temperature isn't measured—it's hidden inside the package. We have to calculate it from electrical data.

### Step 1: From Electrical Power to Heat Generation

The MOSFET dissipates power in two ways:

**Conduction losses** when current flows through the on-resistance:

$$P_{\text{cond}} = I_{\text{rms}}^2 \cdot R_{DS,on}(T_j)$$

**Switching losses** during turn-on and turn-off transitions:

$$P_{\text{sw}} = (E_{on}(T_j) + E_{off}(T_j)) \cdot f_{sw}$$

The critical detail: both $R_{DS,on}$ and $E_{on}$ increase with temperature. Silicon carbide has a positive temperature coefficient:

$$R_{DS,on}(T_j) = R_{DS,on,25°C} \cdot \left(1 + \alpha_T \cdot (T_j - 25)\right)$$

where $\alpha_T \approx 0.004\text{ K}^{-1}$ for SiC.

This creates a feedback loop: hotter junction → higher resistance → more power loss → even hotter junction. The model must iterate to find the equilibrium.

### Step 2: From Heat to Temperature (The Thermal Network)

Heat flows from junction to ambient through multiple material layers: die → solder → substrate → baseplate → coolant. Each interface has thermal resistance $R_{th}$ and capacitance $C_{th}$.

We model this as an electrical RC network using the **electro-thermal analogy**:

| Thermal Domain | Electrical Analog |
|----------------|-------------------|
| Temperature difference $\Delta T$ | Voltage $V$ |
| Heat flow $Q$ | Current $I$ |
| Thermal resistance $R_{th}$ | Resistance $R$ |
| Thermal capacitance $C_{th}$ | Capacitance $C$ |

For a single RC layer, the transient temperature response follows:

$$C_{th} \frac{dT}{dt} = Q_{in} - \frac{T - T_{next}}{R_{th}}$$

Using explicit Euler integration with timestep $\Delta t$:

$$T(t + \Delta t) = T(t) + \frac{\Delta t}{C_{th}} \left[Q_{in} - \frac{T(t) - T_{next}}{R_{th}}\right]$$

The complete module has four cascaded layers. For stability, the timestep must satisfy:

$$\Delta t < 2 \cdot \min(R_{th,i} \cdot C_{th,i})$$

Typical values for a dual-side cooled module: $\Delta t \leq 0.1\text{ s}$.

### Step 3: The Iterative Coupling Loop

At each timestep, we must solve a circular dependency:

1. Guess initial junction temperature: $T_j^{(0)} = T_j(t-\Delta t)$
2. Calculate power losses: $P_{loss}(T_j^{(k)})$
3. Update junction temperature through thermal network: $T_j^{(k+1)}$
4. Check convergence: $|T_j^{(k+1)} - T_j^{(k)}| < \epsilon$
5. If not converged, repeat from step 2

Convergence typically requires 3-5 iterations per timestep with $\epsilon = 0.1\text{ K}$.

### Step 4: From Temperature Profile to Stress Cycles

The Rainflow algorithm extracts closed hysteresis loops from the temperature history. Think of it as identifying complete heating-cooling events that cause damage.

The algorithm tracks turning points (peaks and valleys) and matches them into cycles. For each cycle, we extract:

- **Temperature swing**: $\Delta T_j = T_{max} - T_{min}$
- **Maximum temperature**: $T_{j,max}$
- **Heating duration**: $t_{on}$ (time spent above mean temperature)

These three parameters completely define the stress state.

### Step 5: An empirical lifetime model

The empirical relationship between stress conditions and cycles-to-failure comes from thousands of power cycling tests. An empirical lifetime model (Bayerer et al., CIPS 2008) captures this:

$$N_f = K \cdot (\Delta T_j)^{\beta_1} \cdot \exp\left(\frac{\beta_2}{T_{j,max}}\right) \cdot t_{on}^{\beta_3}$$

where:
- $\beta_1 = -3.483$ captures the **Coffin–Manson relationship**: damage follows a power law with temperature swing (exponent $\beta_1$)
- $\beta_2 = 1917\text{ K}$ represents **Arrhenius activation energy**: chemical degradation accelerates at high temperature (use Kelvin for $T_{j,max}$)
- $\beta_3 = -0.438$ accounts for **creep and diffusion**: longer dwell times cause more damage
- $K$ is a technology-dependent constant calibrated from test data

**Physical interpretation**: A cycle with $\Delta T_j = 100\text{ K}$ causes roughly **50 times** more damage than a cycle with $\Delta T_j = 30\text{ K}$, even though the temperature swing is only 3× larger. This is why performance driving kills components so much faster than urban driving.

### Step 6: Cumulative Damage (Miner's Rule)

Different stress cycles cause different amounts of damage. Miner's rule provides the framework to add them up:

$$D_{total} = \sum_{i=1}^{n} \frac{1}{N_{f,i}}$$

Each cycle consumes a fraction $1/N_{f,i}$ of the component's life. When $D_{total} \geq 1.0$, failure is predicted.

**Example**: If one hour of performance driving produces:
- 50 cycles with $\Delta T = 80\text{ K}$, $N_f = 10^5$ → damage = $50/10^5 = 0.0005$
- 30 cycles with $\Delta T = 120\text{ K}$, $N_f = 10^4$ → damage = $30/10^4 = 0.003$
- 200 cycles with $\Delta T = 20\text{ K}$, $N_f = 10^7$ → damage = $200/10^7 = 0.00002$

Total damage: $0.00352$ per hour → extrapolated lifetime: $284$ hours.

The large cycles dominate. This is why the model must accurately capture peak temperatures.

### The Acceleration Factor Concept

To relate field operation to lab testing, we use acceleration factors:

$$AF = \left(\frac{\Delta T_{field}}{\Delta T_{test}}\right)^{\beta_1} \cdot \exp\left[\beta_2 \left(\frac{1}{T_{max,field}} - \frac{1}{T_{max,test}}\right)\right] \cdot \left(\frac{t_{on,field}}{t_{on,test}}\right)^{\beta_3}$$

If lab tests run at $\Delta T = 100\text{ K}$ and field operation produces $\Delta T = 60\text{ K}$:

$$AF \approx \left(\frac{60}{100}\right)^{-3.483} \approx 6.8$$

The field device will last **6.8 times longer** than the test sample. This allows qualification with accelerated testing.

### Why the Model Works

The model succeeds because it respects the physics at every level:

1. **Temperature-dependent material properties** create realistic feedback
2. **Transient thermal response** captures fast and slow thermal dynamics
3. **Rainflow counting** correctly identifies damage-causing events
4. **Empirical lifetime model** is validated against decades of test data

The output isn't a guess—it's a physics-based prediction you can validate with power cycling tests following AQG 324 standards.

These examples and the <a href="https://github.com/matteototaro/sic-thermal-lifetime">project</a> published on GitHub were created with the help of AI-assisted tools to:
- preserve confidentiality for sensitive data,
- convert the MATLAB model into Python,
- demonstrate the methodology using publicly available SiC datasheet parameters while respecting confidentiality requirements.

The full thesis can be accessed <a href="https://github.com/matteototaro/Fatigue-Analysis-SiC-Power-Module/blob/main/Totaro_Matteo_MastersThesis.pdf">here</a>.

### Example

Power module & test conditions used in this example (extracted from the Python port):

| Parameter | Value |
|---|---|
| Module | Infineon FS03MR12A6MA1B — 1200 V, 310 A |
| R_th_jc | 0.10 K/W (R_th_jc_max: 0.108 K/W) |
| E_on (mJ) interpolation points | 25 °C: 19.48; 125 °C: 19.85; 150 °C: 20.16 |
| E_off (mJ) interpolation points | 25 °C: 17.61; 125 °C: 17.95; 150 °C: 18.21 |
| R_DS_on (Ω) interpolation points | 25 °C: 2.75e-3; 125 °C: 4.00e-3; 150 °C: 4.55e-3 |
| Voltage / current references | V_DC_ref = 800 V; I_ref = 310 A; V_F (diode) = 1.3 V |
| Thermal network | R_th array scaled from module R_th_jc; representative R_th values used in the script |
| Power-cycling (AQG) test params | ΔT_test = 100 °C; t_on_test = 1.0 s; PC_min_temp = 50 °C; PC_max_temp = 150 °C; N_f_test = 1000 cycles |
| Lifetime model coefficients | β1 = -3.483; β2 = 1917 K; β3 = -0.438 |

{{< gallery-image 
    src="/images/projects/example_output.png"
    title="Example output"
    caption="Example output generated by the Python port of the model" >}}

### References

- ECPE AQG 324 - Qualification of Automotive Electronic Components
- Infineon FS03MR12A6MA1B Datasheet - 1200V 310A SiC Power Module
- ASTM E1049-85 - Standard Practices for Cycle Counting in Fatigue Analysis
- Bayerer, R., Herrmann, T., Licht, T., Lutz, J., & Feller, M. (2008) - "Model for Power Cycling lifetime of IGBT Modules - various factors influencing lifetime", 5th International Conference on Integrated Power Electronics Systems (CIPS), Nuremberg, Germany, pp. 1-6
- Miner (1945) - Cumulative Damage in Fatigue, Journal of Applied Mechanics
- IEC 60749-34 - Power Cycling Test to Failure for Power Semiconductor Devices
- Held, M., et al. (1997) - "Fast power cycling test of IGBT modules in traction application", LESIT Project

- Norris-Landzberg (Norris & Landzberg acceleration factors / AF formulation)

<style>
@media (max-width: 768px) {
  div[style*="display: flex"] {
    flex-direction: column !important;
  }
}
</style>
