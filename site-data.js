/*
  This is the main content file for the portfolio.
  Add future roles, projects, publications, and contact links here.
*/
window.PORTFOLIO_DATA = {
  experience: [
    {
      period: "Jul 2023 — Sep 2025",
      company: "Tidal Wave Technologies Pvt. Ltd.",
      role: "Networking & RF Engineer",
      location: "Mumbai, India",
      summary:
        "Worked on a portable private-5G Network-in-a-Box across antenna design, RF validation, test automation, and outdoor deployment.",
      highlights: [
        "Designed n78 microstrip antenna elements in CST for 3.3–3.8 GHz and supported FR-4 prototype validation.",
        "Measured return loss, EVM, ACLR, and spectral-mask performance against 3GPP Release 15 expectations.",
        "Automated throughput, latency, and packet-loss test sweeps, then supported field trials with commercial 5G devices."
      ]
    },
    {
      period: "May 2022 — Aug 2022",
      company: "Vedant Radio Technologies Pvt. Ltd.",
      role: "RF Engineering Intern",
      location: "Mumbai, India",
      summary:
        "Contributed to RF front-end work for LTE and 5G infrastructure, including Doherty power-amplifier and signal-processing projects.",
      highlights: []
    },
    {
      period: "Oct 2020 — Apr 2021",
      company: "GeeksforGeeks",
      role: "Technical Content Writer Intern",
      location: "India",
      summary:
        "Wrote accessible technical articles across electronics, AI, machine learning, and cybersecurity.",
      highlights: []
    }
  ],

  work: [
    {
      number: "01",
      type: "research hardware",
      label: "RF research",
      title: "Metamaterial impedance matching",
      description:
        "Optimized split-ring-resonator unit cells for a 2.4 GHz microstrip design, combining CST simulation, mathematical modeling, fabrication, and VNA testing.",
      outcome: "15% bandwidth enhancement",
      tags: ["CST Studio", "VNA", "FR-4", "2.4 GHz"]
    },
    {
      number: "02",
      type: "research hardware",
      label: "Antenna research",
      title: "Dual-band 5G patch array",
      description:
        "Designed a compact 3.5/5.5 GHz microstrip patch array and used defected-ground structures to improve port isolation and dual-band behavior.",
      outcome: ">20 dB isolation",
      tags: ["HFSS", "DGS", "Antenna array", "5G"]
    },
    {
      number: "03",
      type: "hardware software",
      label: "Safety system",
      title: "Landmine detection rover",
      description:
        "Led the development of a low-cost rover with GPS mapping, Wi-Fi control, self-navigation, obstacle avoidance, and real-time location reporting.",
      outcome: "Published project",
      tags: ["Arduino", "ESP8266", "GPS", "Sensors"]
    },
    {
      number: "04",
      type: "hardware software",
      label: "Digital design",
      title: "FPGA PWM generator",
      description:
        "Developed a Verilog PWM generator on a Xilinx FPGA and extended it from a basic waveform to multi-LED intensity control.",
      outcome: "FPGA prototype",
      tags: ["Verilog", "Xilinx", "PWM", "FPGA"]
    }
  ],

  publications: [
    {
      date: "June 2023",
      title: "Landmine Detection Rover with Automated Area Scanning and Real-Time GPS Mapping",
      description:
        "An accessible safety platform integrating GPS localization, obstacle avoidance, wireless location reporting, and metal detection.",
      href: "https://doi.org/10.13140/RG.2.2.23205.31208"
    }
  ],

  contacts: [
    { label: "Email", value: "spote@purdue.edu", href: "mailto:spote@purdue.edu", copy: true },
    { label: "LinkedIn", value: "sanjyotpote", href: "https://www.linkedin.com/in/sanjyotpote" },

    // Add these when ready; entries without an href stay hidden from the public site.
    { label: "GitHub", value: "Add username", href: "" },
    { label: "Gmail", value: "Add address", href: "" }
  ]
};
