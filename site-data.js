/*
  Future updates live here.
  Add a project, role, publication, or social link by copying an existing item.
*/
window.PORTFOLIO_DATA = {
  projects: [
    {
      id: "ntn",
      number: "01",
      type: "Wireless networks · Course research",
      year: "Spring 2026",
      title: "Which non-terrestrial network fits the mission?",
      shortTitle: "5G / 6G NTN framework",
      summary:
        "A survey of 3GPP Releases 17–19 that turns a broad NTN landscape into an application-driven architecture choice.",
      approach:
        "Built a multi-criteria decision framework around latency, density, mobility, power, cost, regulation, sensing, and environmental impact—then added fuzzy regulatory inputs and Bayesian updating from field evidence.",
      outcome:
        "A traceable path from use-case requirements to a concrete RAT, payload, handover, HARQ, slice, and QoS configuration. The analysis favors regenerative LEO for rural broadband and UAV/HAPS for rapid disaster coverage.",
      tags: ["3GPP Rel-17–19", "LEO / HAPS / UAV", "MCDM", "ISAC", "6G"],
      visual: "orbit",
      actions: [
        { label: "Read the paper", href: "./ECE_60022_NTN_Survey_Paper_Sanjyot_Pote.pdf" }
      ]
    },
    {
      id: "n78",
      number: "02",
      type: "RF engineering · Industry",
      year: "2023—2025",
      title: "Taking a private 5G radio from bench to field.",
      shortTitle: "Private 5G Network-in-a-Box",
      summary:
        "RF and network work for a portable, software-based n78 gNB designed for tactical and emergency-response deployment.",
      approach:
        "Iterated microstrip antenna geometry in CST, supported FR-4 prototyping and VNA characterization, measured EVM, ACLR, return loss and spectral masks, and automated throughput, latency, and packet-loss sweeps in Python.",
      outcome:
        "Faster bring-up cycles, better visibility into RF regressions, and field evidence that helped the team debug coverage and handover behavior with commercial 5G devices.",
      tags: ["3.3–3.8 GHz", "CST", "VNA", "3GPP Rel-15", "Python"],
      visual: "spectrum",
      actions: []
    },
    {
      id: "pwm",
      number: "03",
      type: "Digital design · FPGA",
      year: "2022",
      title: "One counter, one comparator, four controlled LEDs.",
      shortTitle: "Verilog PWM generator",
      summary:
        "A hardware PWM generator written in Verilog, simulated in Xilinx ISE, and tested on an Elbert V2 development board.",
      approach:
        "Used an 8-bit counter and comparator to translate an input threshold into duty cycle, then extended the design from one 50% waveform to simultaneous multi-LED intensity control.",
      outcome:
        "A working Spartan-3A FPGA prototype that demonstrated synthesis, simulation, bitstream deployment, and visible duty-cycle control on four LEDs.",
      tags: ["Verilog", "Xilinx ISE", "Spartan-3A", "8-bit PWM", "Elbert V2"],
      visual: "pwm",
      actions: [
        { label: "Open project report", href: "./PWM_Generator_Project_Report.pdf" }
      ]
    },
    {
      id: "rover",
      number: "04",
      type: "Embedded systems · Safety",
      year: "2022—2023",
      title: "Mapping hazards without putting people first in line.",
      shortTitle: "Landmine detection rover",
      summary:
        "A low-cost mobile platform built around safer area scanning, real-time GPS reporting, and remote operation.",
      approach:
        "Integrated dual Arduino Nano controllers, a metal-detection coil, NEO-6M GPS, ESP8266 Wi-Fi, ultrasonic obstacle sensing, Google Sheets logging, and Google Maps pin locations.",
      outcome:
        "A lightweight field prototype and published paper focused on making hazard detection more accessible in resource-constrained regions.",
      tags: ["Arduino", "GPS", "ESP8266", "Sensors", "Mapping"],
      visual: "map",
      actions: [
        { label: "View publication", href: "https://doi.org/10.13140/RG.2.2.23205.31208" }
      ]
    }
  ],

  experience: [
    {
      period: "Jul 2023 — Sep 2025",
      role: "Networking & RF Engineer",
      company: "Tidal Wave Technologies",
      location: "Mumbai, India",
      summary: "Private 5G radio design, RF validation, network test automation, and outdoor trials.",
      detail:
        "Worked across the n78 radio path and end-to-end system: antenna simulation, prototype measurements, 3GPP-oriented RF checks, Python automation, and on-site bring-up with commercial UEs."
    },
    {
      period: "May 2022 — Aug 2022",
      role: "RF Engineering Intern",
      company: "Vedant Radio Technologies",
      location: "Mumbai, India",
      summary: "RF front-end work for LTE and 5G infrastructure.",
      detail:
        "Contributed to Doherty power-amplifier and signal-processing projects, including PAPR-focused work for 2T2R and 4T4R configurations."
    },
    {
      period: "Oct 2020 — Apr 2021",
      role: "Technical Content Writer",
      company: "GeeksforGeeks",
      location: "India",
      summary: "Technical writing across electronics, AI, machine learning, and cybersecurity.",
      detail:
        "Translated emerging technical topics into approachable articles and contributed to a 30% increase in social engagement."
    }
  ],

  writing: [
    {
      label: "Course research · Spring 2026",
      title: "Non-Terrestrial Networks for 5G and 6G",
      note: "3GPP standardization survey and an application-driven architecture selection framework.",
      href: "./ECE_60022_NTN_Survey_Paper_Sanjyot_Pote.pdf"
    },
    {
      label: "Publication · June 2023",
      title: "Landmine Detection Rover with Automated Area Scanning and Real-Time GPS Mapping",
      note: "GPS localization, obstacle avoidance, wireless reporting, and metal detection in a low-cost safety platform.",
      href: "https://doi.org/10.13140/RG.2.2.23205.31208"
    }
  ],

  contacts: [
    { label: "Email", value: "spote@purdue.edu", href: "mailto:spote@purdue.edu", copy: true },
    { label: "LinkedIn", value: "sanjyotpote", href: "https://www.linkedin.com/in/sanjyotpote" },
    { label: "GitHub", value: "sanjyotpote", href: "https://github.com/sanjyotpote" }
  ]
};
