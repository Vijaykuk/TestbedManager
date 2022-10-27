export const scaleDetails = {
  Interfaces: [
    {
      feature: "Bundle Ether (dual stack) per System",
      value: "128",
    },
    {
      feature: "Bundle Members per Bundle",
      value: "64",
    },
    {
      feature: "Bundle-Members per System",
      value: "1152",
    },
  ],
  ISIS: [
    {
      feature: "Node Scale",
      value: "10",
    },
    {
      feature: "Neighbors v4/v6",
      value: "128",
    },
    {
      feature: "Routes v4/v6",
      value: "9K/6K",
    },
    {
      feature: "ISIS-SR Labeled Routes v4+v6",
      value: "10",
    },
  ],
  BGP: [
    {
      feature:
        "Neighbors ibgp/ebgp \n(scaling numbers for v4 and v6 and for eBGP and iBGP MUST be met simultanously)",
      value: "20 iBGP v4,\n 20 iBGP v6,\n 0 eBGP v4,\n 0 eBGP v6",
    },
    {
      feature:
        "Routes/Paths v4/v6 \n (scaling numbers for v4 and v6 MUST be met simultanously)",
      value: "v4 - 20K/200K \n v6 - 10K/100K",
    },
    {
      feature: "BGP Multipath / Addpath (ibgp/ebgp)",
      value: "32/32",
    },
  ],
  "RSVP/TE": [
    {
      feature: "RSVP-TE - Midpoint",
      value: "96K",
    },
    {
      feature: "RSVP-TE - NHOP - Link FRR - Headend",
      value: "96K",
    },
    {
      feature: "RSVP-TE - NNHOP - Node FRR - Headend",
      value: "96K",
    },
    {
      feature: "RSVP-TE - NHOP - Link FRR - Tailend",
      value: "96K",
    },
    {
      feature: "RSVP-TE - NNHOP - Node FRR - Tailend",
      value: "96K",
    },
  ],
  "Static (MPLS/IPv4/IPv6)":
    "25 v4 LSP for ariadne prober \n + CX|DX facing bundles",
  QoS:
    "Ingress/Egress \n 32 class-maps for \n ingress policy (classification & marking) \n\n 8 class-maps for \n egress policy (queueing/scheduling)",
  "Netflow/IPFIX/sFlow": [
    {
      feature: "Version & Address Family",
      value: "Ingress Netflow v9 for IPv4/v6/MPLS",
    },
    {
      feature: "FLow Cache Table size",
      value: "1000000",
    },
    {
      feature: "Sampling rate",
      value: "1 in 32k",
    },
  ],
  ACL: [
    {
      feature: "ACL v4/v6",
      value: "1 v4 QoS ACL \n 1 v4 NTP ACL",
    },
    {
      feature: "ACE v4/v6",
      value: "1 v4 QoS ACE \n 10 v4 NTP ACE's",
    },
  ],
};
