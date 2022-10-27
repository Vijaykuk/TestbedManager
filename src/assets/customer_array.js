export const customer_list = [
  {
    name: "Google",
    cvt_loacation: "",
    franchise: "Google",
    timeLineImage: "timeline.png",
    mileStoneImage: "milestone.png",
    topologyImage: "cvt-topo.png",
    networkImage: "cust-topo.png",
    releases: "732,752,741,735",
    headline:
      "Production Release – 712 (ASR9k, NCS5500, NCS5K), 731 (8000) ; Next Upgrade Release – 734 ; Upcoming EFT – 734 (5/7) ; Upcoming NPI – CX-8808(734), SR|EC-8202-32FH(752) ",
    platformDetails: {
      ASR9K: {
        roles: "BX,BB,RB,BD",
        chassisList: "ASR9922,ASR9904",
        cardList: "A99-12X100GE,A99-8X100GE,A99-RP2-SE,A9K-RSP5-SE",
      },
      NCS5500: {
        roles: "CX,DX,PF,ME,EX,BX",
        chassisList: "NCS55A1,NCS5508,NCS5501",
        cardList: "NC55-36X100G,NC55-18H18F,NC55-36X100G-S",
      },
      NCS5000: {
        roles: "SR,EC,VT",
        chassisList: "NCS5011",
        cardList: "",
      },
     "8000": {
       roles: "BX,CX,DX",
       chassisList: "8808",
       cardList: "88-LC0-36FH,88-LC0-36FH-M",
      },
    },
    roleDetails: {
      ASR9K: {
        BX: {
          chassisList: "ASR9922,ASR9904",
        },
        BB: {
          chassisList: "ASR9922,ASR9904",
        },
        RB: {
            chassisList: "ASR9922,ASR9904",
        },
        BD: {
            chassisList: "ASR9922,ASR9904",
        },  
      },
      "8000": {
        BX: {
          chassisList: "8808",
        },
        CX: {
          chassisList: "8808",
        }, 
        DX: {
           chassisList: "8808",
        }, 
      },
      NCS5500: {
        CX: {
          chassisList: "NCS5508,NCS55A1",
        },
        DX: {
            chassisList: "NCS5508",
        },  
        BX: {
            chassisList: "NCS5508",
        },  
        PF: {
          chassisList: "NCS55A1,NCS5508,NCS5501",
        },
        ME: {
          chassisList: "NCS55A1,NCS5508,NCS5501",
        },
        EX: {
          chassisList: "NCS55A1,NCS5508,NCS5501",
        },
      },
      NCS5000:{
        SR: {
          chassisList: "NCS5011",
      },  
      EC: {
        chassisList: "NCS5011",
      },
      VT: {
        chassisList: "NCS5011",
      },
    },
  },
    prodImages: {
      "712": {
            ASR9K: {
            revs: "rev0,rev1,rev2,rev3,rev4,rev5",
            status: "active",
            },
            NCS5500: {
            revs: "rev0,rev1,rev2,rev3,rev5",
            status: "active",
            },
            NCS5000: {
                revs: "rev0,rev1,rev2,rev3,rev4",
                status: "active",
            },  
        },
        "732":{
            ASR9K: {
              revs: "rev0,rev1,rev2,rev3,rev5",
              status: "",
            },
            NCS5500: {
                revs: "rev0",
                status: "",
            },
            NCS5000: {
                    revs: "rev0",
                    status: "",
            },  
        }
    },
    rel_paths:[{
       release:"712",
       rev:"rev0",
       platform:"ASR9K",
       image_location:"/ws/ankv-sjc/Google/asr9K-min.vm"
    },
    {
      release:"712",
      rev:"rev0",
      platform:"NCS5500",
      image_location:"/ws/ankv-sjc/Google/ncs-min.vm"
   },
   {
    release:"731",
    rev:"rev1",
    platform:"NCS5500",
    image_location:"/ws/ankv-sjc/Google/asr9K-min.vm"
 }
 ],
    cfdDetails:["CSCvv35152","CSCvx76388","CSCwa64038","CSCvx95191","CSCvw73974","CSCvx16766","CSCvz64652","CSCvv43868","CSCvy24352","CSCvy00012","CSCwa81228"],
    smuDetails: {
        "732":{
            NCS5500: {
                rev0: ""
            },
            ASR9K: {
                rev0: ""
            },
            NCS5500: {
              rev0: "CSCvv59529,CSCvv35152",
              rev1: "CSCvv91667,CSCvw14395,CSCvv14645,CSCvw73528,CSCvv77077,CSCvw70418,CSCvx51364,CSCvs79793",
              rev2: "CSCvw66546,CSCvw88986",
            },
        },
      "712": {
        NCS5500: {
          rev0: "CSCvv59529,CSCvv35152",
          rev1: "CSCvv91667,CSCvw14395,CSCvv14645,CSCvw73528,CSCvv77077,CSCvw70418,CSCvx51364,CSCvs79793",
          rev2: "CSCvw66546,CSCvw88986",
          rev3: "CSCvz00969,CSCvs77963,CSCvz30068,CSCvx16766,CSCvu63474,CSCvx28861,CSCvx24908,CSCvx76388,CSCvx95699,CSCvy67182,CSCvx68633,CSCvy24841,CSCvy48247,CSCvy85575,CSCvx95191",
          rev5: "CSCvw97862,CSCvz58617,CSCwa45250,CSCwa94978,CSCvv43868,CSCvz64652,CSCwa67075,CSCvw54888,CSCvw96082,CSCvz68295"
        },
        ASR9K: {
            rev0: "CSCvv35152",
            rev1: "CSCvv35152,CSCvv35152,CSCvv35152,CSCvv35152,CSCvv35152,CSCvv35152,CSCvv35152,CSCvv35152",
            rev2: "CSCvx27180,CSCvu63474,CSCvx24908,CSCvw73974",
            rev3: "CSCvx76388,CSCvx95191,CSCvz30068,CSCvv89080",
            rev4: "CSCwa64038,CSCvz64652,CSCvv43868,CSCvy24352,CSCvy00012,CSCwa81228",
            rev5: "CSCvz58617,CSCwb02907,CSCwb11037"
        },  
        NCS5000: {
            rev0: "",
            rev1: "CSCvv70305",
            rev2: "CSCvu63474,CSCvx24908,CSCvy05695",
            rev3: "CSCvx95191",
            rev4: "CSCvz05676,CSCvz58617"
          },
      },
    },
    cfdDetails:["CSCvv35152","CSCvx76388","CSCwa64038","CSCvx95191","CSCvw73974","CSCvx16766","CSCvz64652","CSCvv43868","CSCvy24352","CSCvy00012","CSCwa81228"],
    imageDetailsArray:[{
      image:"Google_Image1.png",
      imageDetails:"<p>Google&rsquo;s global network, one of the largest in the world, consists of</p><ul><li>Jupiter Network &ndash; CLOS based data center fabric architecture</li><li>B4 back bone network &ndash; SDN based data center interconnect network sing OpenFlow to control relatively simple switches built from merchant silicon</li><li>B2 back bone network &ndash; Public connecting network (Cisco, Juniper and Arista based network)</li><li>Espresso &ndash; SDN based Peering Edge &ndash; dynamically choose from where o serve customers based on end to end measurements.</li></ul><p>We are mainly participating in B2 network which is connecting the data center to the internet and cloud customers.</p>"
    },
    {
      image:"Google_Image2.png",
      imageDetails:'<div data-automation-id="CanvasControl"><div><div data-sp-feature-tag="Rich Text Editor" data-sp-feature-instance-id="b5f2e2b8-9856-40c7-aa2e-cf194c959364"><div data-automation-id="textBox"><p>Google backbone network consists of B2 and B4 network. B2 is interface facing and B4 is for interconnecting data center.&nbsp;</p><p>Following table shows Cisco Role at B2 Network</p></div></div></div></div><div data-automation-id="CanvasControl"><div><div data-sp-feature-tag="Rich Text Editor" data-sp-feature-instance-id="76db9653-0e5d-4866-b2a1-3787c3636f83"><div data-automation-id="textBox"><div><div><table title="Table"><thead><tr><th><strong>Google Node</strong></th><th><strong>Role</strong></th><th><strong>Cisco Plattforms</strong></th><th><strong>Release</strong></th></tr></thead><tbody><tr><td>PF</td><td>Peering</td><td>NCS5500</td><td>6.5.3</td></tr><tr><td>CX</td><td>Aggregation</td><td>NCS5500</td><td>6.5.3</td></tr><tr><td>BB</td><td>LER</td><td>ASR9000</td><td>6.2.25</td></tr><tr><td>BD</td><td>LET with PBTS</td><td>ASR9000</td><td>6.2.25</td></tr><tr><td>RB</td><td>RR</td><td>ASR9000</td><td>6.5.3</td></tr><tr><td>SR/EC</td><td>CDN ToR</td><td>NCS5011</td><td>6.5.3</td></tr></tbody></table></div></div></div></div></div></div>'
    },
    {
      image:"Google_Image3.gif",
      imageDetails:"<p>This is a generic use case when&nbsp;a user access Google CDN content. As an example this could be Cloud customers or a generic user accessing Youtube/Gmail content. Here is how it works. &nbsp;</p><ul><li>When a new customer comes Google provision a new interface or VLAN towards external peering node</li><li>Using BGP Proxy peer node creates a BGP session with Google BGP proxy server running in their CDN network.</li><li>In order to make BGP proxy on PF there is a ABF configured on the customer connected interface, the ABF will redirect traffic to server Anycast address.</li><li>Server address is reachable over a GRE tunnel and is preconfigured on the system.</li><li>MPLS static configuration will also identify a label on top of GRE which would identify the application running behind the server.</li></ul>"
    },
    {
      image:"Google_Image4.gif",
      imageDetails:"<p>On the reverse path</p><ul><li>Server encapsulate the reverse traffic into a GRE header destined to the CX node and it will also attach a label which helps CX node to identify the PF destination.</li><li>GRE packet gets decapsulated at CX and forwards as MPLS towards the PF node using the static mpls pre-configuration</li><li>PF will have a static label mapping to forward the packets towards customer connected interface as IP traffic</li></ul><p>Look at above diagram to visualize the control plane</p>"
    },
    {
      image:"Google_Image5.gif",
      imageDetails:"<p>In some cases the requested content wont be available locally on the POP CDN network, in those situations the server forwards the request to remote DC POP. Depending on the services the traffic can take RSVP or SRTE tunnel in transient. This particular use-case talks about the RSVP use case</p><ul><li>In order to forward the packet remote CDN, server encapsulate the packet with a GRE header towards the CX node, along with a label to identify the BB node. This label would be statically configured on CX nodes.</li><li>When the packet reaches CX it decapsulate the packet first and then using the outer label forwards to the BB/BD node.</li><li>BB/BD node forwards the packets to RSVP tunnel towards remove BX network.</li></ul>"
    },
    {
      image:"Google_Image6.gif",
      imageDetails:"<p>Google is lately migrating some of their services to SRTE based&nbsp; network. Currently segment routing is enabled between BX network and in future it will get extended to CX nod. For time being they have a static mpls running between CX and BX to enable end to end SRTE flow.</p><p>This is how SRTE packet flows</p>"
    }],
    opticDetails: {
      ASR9K: {
        optics: "QSFP-100G-AOC5M,CPAK-100G-SR10,QSFP-100G-LR4-S",
      },
      NCS5500: {
        optics: "QSFP-100G-AOC5M,CPAK-100G-SR10,QSFP-100G-LR4-S,QSFP-H40G-AOC1M",
      },
      NCS5K: {
        optics: "QSFP-100G-AOC5M,CPAK-100G-SR10,QSFP-100G-LR4-S,QSFP-H40G-AOC1M",
      },
      "8000": {
        optics: "QSFP-100G-AOC5M,CPAK-100G-SR10,QSFP-100G-LR4-S,QSFP-H40G-AOC1M",
      },
    },
    featureDetails: {
      BGP: {
        ASR9K: {
          roles: "BX,RB,BB,BD",
        },
        NCS5500: {
          roles: "PF,DX,CX,EX,ME,BX",
        },
        NCS5000: {
            roles: "SR,EC,VT",
        },
        "8000": {
            roles: "BX,CX",
          },  
     },
      ISIS: {
        ASR9K: {
          roles: "BX,BB,RB,BD",
        },
        "8000": {
          roles: "BX,CX",
        },
        NCS5000: {
            roles: "BX,CX",
        },
     },
     "MPLS-STATIC": {
        ASR9K: {
          roles: "BX,RB,BB,BD",
        },
        NCS5500: {
          roles: "PF,DX,CX,EX,ME,BX",
        },
        NCS5000: {
            roles: "SR,EC,VT",
        },
        "8000": {
            roles: "BX,CX",
          },  
      },
      "MPLS-TE": {
        ASR9K: {
          roles: "BX,BB,BD,RB",
        },
        NCS5500: {
          roles: "BX",
        },
        "8000": {
            roles: "BX",
        },
      },
      Telemetry: {
        ASR9K: {
          roles: "BX,RB,BB,BD",
        },
        NCS5500: {
          roles: "PF,DX,CX,EX,ME,BX",
        },
        NCS5000: {
            roles: "SR,EC,VT",
        },
        "8000": {
            roles: "CX,BX",
        },
      },
      PBTS: {
        ASR9K: {
          roles: "BB,BD",
        },
      },      
      RFC5549: {
        NCS5500: {
          roles: "CX",
        },
        NCS5000: {
            roles: "SR",
          },
        "8000": {
            roles: "CX",
        },  
      },      
      GUE: {
        NCS5500: {
          roles: "CX,PF",
        },
        "8000": {
            roles: "CX",
        },
      }, 
      GRE: {
        NCS5500: {
          roles: "CX,PF",
        },
        "8000": {
            roles: "CX",
          },
      }, 
      BVI: {
        NCS5500: {
          roles: "CX",
        },
      }, 
      L2VPN: {
        NCS5500: {
          roles: "CX",
        },
        NCS5000: {
            roles: "SR",
        },
      },
      IPFIX315: {
        NCS5500: {
          roles: "PF",
        },
      }, 
      NetFlow: {
        ASR9K: {
          roles: "BX,RB,BB,BD",
        },
        NCS5500: {
          roles: "DX,CX,EX,ME,BX",
        },
        NCS5000: {
            roles: "SR,EC,VT",
        },
        "8000": {
            roles: "BX,CX",
        },  
      },
      QoS: {
        ASR9K: {
          roles: "BX,RB,BB,BD",
        },
        NCS5500: {
          roles: "PF,DX,CX,EX,ME,BX",
        },
        NCS5000: {
            roles: "SR,EC,VT",
        },
        "8000": {
            roles: "BX,CX",
        },  
      },
      DarkBW: {
        ASR9K: {
          roles: "BX,RB,BB,BD",
        },
        NCS5500: {
          roles: "BX",
        },
        "8000": {
            roles: "BX",
        },  
      },
      SRTE: {
        ASR9K: {
          roles: "BX,BB,BD,RB",
        },
        NCS5500: {
          roles: "BX,CX,DX",
        },
        "8000": {
            roles: "BX,CX",
        },  
      },
    },
    platformReleaseDetails:{
      "ASR9K": {
         vendors:"Cisco,Juniper",
         current_release:"7.1.2",
         next_release:"7.3.4"
       },
      "NCS5500": {
         vendors:"Cisco,Arista",
         current_release:"7.1.2",
         next_release:"7.3.4"
        },
       "NCS5000":{
         platform:"NCS5500",
        vendors:"Cisco,Arista",
         current_release:"7.1.2",
         next_release:"7.3.4"
       
       },
       "8000":{
        platform:"NCS5500",
       vendors:"Cisco,Arista",
        current_release:"7.1.2",
        next_release:"7.3.4"
      
      },
       
     },
     labDetails:{
      "Lab setup":"3-2xmanual, 1xregression",
      "Platforms":"ASR9K,NCS5500,NCS5K,8000",
      "Role":"PF,CX,SR|EC,ME,EX,BB",
      "Full Box":2,
      "Hardware Gap":"None",
      "TGEN":"Ixia,Spirent"
    },
    projectDetails:{
      B2:{
        location:"SJC Bangalore",
        res_count:"2"
      },
      B4:{
         location:"SanJose",
        res_count:"1+2(c)"
      }
    },
    team: [
      {
        name: "abc",
        location: "",
        role: "",
        org: "marketing",
        CVT_POC: "true",
        designation: "abc designation",
        esc_lead: "",
        eng_sponser: "",
        cvt_mgr: "",
      },
      {
        name: "abc1",
        role: "",
        org: "CVT/AT",
        CVT_POC: "true",
        designation: "abc designation",
        esc_lead: "",
        eng_sponser: "",
        cvt_mgr: "",
      },
      {
        name: "abc2",
        role: "",
        org: "marketing",
        CVT_POC: "true",
        designation: "abc designation",
        esc_lead: "",
        eng_sponser: "",
        cvt_mgr: "",
      },
      {
        name: "abc3",
        role: "",
        org: "cvt/at",
        CVT_POC: "true",
        designation: "abc designation",
        esc_lead: "",
        eng_sponser: "",
        cvt_mgr: "",
      },
    ],
  },
  {
    name: "Microsoft",
    franchise: "Microsoft",
    releases: "732,752,741,735",
    timeLineImage: "timeline.png",
    mileStoneImage: "milestone.png",
    topologyImage: "cvt-topo.png",
    networkImage: "cust-topo.png",
    headline:
      "Production Release – 712 (ASR9k, NCS5500, NCS5K), 731 (8000) ; Next Upgrade Release – 734 ; Upcoming EFT – 734 (4/1), 752 (3/31) ; Upcoming NPI – CX-8808(734), SR|EC-8202-32FH(752) ",
    platformDetails: {
      ASR9K: {
        roles: "BX,BB",
        chassisList: "ASR9922,ASR9904",
        cardList: "12x100G,8x100G",
      },
      NCS5500: {
        roles: "CX,PF,ME,EX,BX",
        chassisList: "55A1,5508,5501",
        cardList: "36x100G,18Hx18F",
      },
      NCS5K: { roles: "", chassisList: "", cardList: "" },
      "8000": { roles: "", chassisList: "", cardList: "" },
    },
    roleDetails: {
      ASR9K: {
        BX: {
          chassisList: "ASR9922,ASR9904",
        },
        BB: {
          chassisList: "ASR9922,ASR9904",
        },
      },
      NCS5500: {
        CX: {
          chassisList: "55A1,5508,5501",
        },
        PF: {
          chassisList: "55A1,5508,5501",
        },
        ME: {
          chassisList: "55A1,5508,5501",
        },
        EX: {
          chassisList: "55A1,5508,5501",
        },
      },
    },
    prodImages: {
      "732": {
        ASR9K: {
          revs: "rev1,re2,rev3",
          status: "active",
        },
        NCS5500: {
          revs: "rev1,re2,rev4,rev5",
          status: "active",
        },
      },
    },
    smuDetails: {
      "732": {
        ASR9K: {
          rev1: "CSCvv91667,CSCvw14395",
          rev2: "CSCvw73528,CSCvv77077,CSCvw70418",
          rev3: "CSCvx51364,CSCvw99276,CSCvw04697",
        },
      },
    },
    cfdDetails:["CSCvv35152","CSCvx76388","CSCwa64038","CSCvx95191","CSCvw73974","CSCvx16766","CSCvz64652","CSCvv43868","CSCvy24352","CSCvy00012","CSCwa81228"],
    imageDetailsArray:[{
      image:"Google_Image1.png",
      imageDetails:"<p>Google&rsquo;s global network, one of the largest in the world, consists of</p><ul><li>Jupiter Network &ndash; CLOS based data center fabric architecture</li><li>B4 back bone network &ndash; SDN based data center interconnect network sing OpenFlow to control relatively simple switches built from merchant silicon</li><li>B2 back bone network &ndash; Public connecting network (Cisco, Juniper and Arista based network)</li><li>Espresso &ndash; SDN based Peering Edge &ndash; dynamically choose from where o serve customers based on end to end measurements.</li></ul><p>We are mainly participating in B2 network which is connecting the data center to the internet and cloud customers.</p>"
    },
    {
      image:"Google_Image2.png",
      imageDetails:'<div data-automation-id="CanvasControl"><div><div data-sp-feature-tag="Rich Text Editor" data-sp-feature-instance-id="b5f2e2b8-9856-40c7-aa2e-cf194c959364"><div data-automation-id="textBox"><p>Google backbone network consists of B2 and B4 network. B2 is interface facing and B4 is for interconnecting data center.&nbsp;</p><p>Following table shows Cisco Role at B2 Network</p></div></div></div></div><div data-automation-id="CanvasControl"><div><div data-sp-feature-tag="Rich Text Editor" data-sp-feature-instance-id="76db9653-0e5d-4866-b2a1-3787c3636f83"><div data-automation-id="textBox"><div><div><table title="Table"><thead><tr><th><strong>Google Node</strong></th><th><strong>Role</strong></th><th><strong>Cisco Plattforms</strong></th><th><strong>Release</strong></th></tr></thead><tbody><tr><td>PF</td><td>Peering</td><td>NCS5500</td><td>6.5.3</td></tr><tr><td>CX</td><td>Aggregation</td><td>NCS5500</td><td>6.5.3</td></tr><tr><td>BB</td><td>LER</td><td>ASR9000</td><td>6.2.25</td></tr><tr><td>BD</td><td>LET with PBTS</td><td>ASR9000</td><td>6.2.25</td></tr><tr><td>RB</td><td>RR</td><td>ASR9000</td><td>6.5.3</td></tr><tr><td>SR/EC</td><td>CDN ToR</td><td>NCS5011</td><td>6.5.3</td></tr></tbody></table></div></div></div></div></div></div>'
    },
    {
      image:"Google_Image3.gif",
      imageDetails:"<p>This is a generic use case when&nbsp;a user access Google CDN content. As an example this could be Cloud customers or a generic user accessing Youtube/Gmail content. Here is how it works. &nbsp;</p><ul><li>When a new customer comes Google provision a new interface or VLAN towards external peering node</li><li>Using BGP Proxy peer node creates a BGP session with Google BGP proxy server running in their CDN network.</li><li>In order to make BGP proxy on PF there is a ABF configured on the customer connected interface, the ABF will redirect traffic to server Anycast address.</li><li>Server address is reachable over a GRE tunnel and is preconfigured on the system.</li><li>MPLS static configuration will also identify a label on top of GRE which would identify the application running behind the server.</li></ul>"
    },
    {
      image:"Google_Image4.gif",
      imageDetails:"<p>On the reverse path</p><ul><li>Server encapsulate the reverse traffic into a GRE header destined to the CX node and it will also attach a label which helps CX node to identify the PF destination.</li><li>GRE packet gets decapsulated at CX and forwards as MPLS towards the PF node using the static mpls pre-configuration</li><li>PF will have a static label mapping to forward the packets towards customer connected interface as IP traffic</li></ul><p>Look at above diagram to visualize the control plane</p>"
    },
    {
      image:"Google_Image5.gif",
      imageDetails:"<p>In some cases the requested content wont be available locally on the POP CDN network, in those situations the server forwards the request to remote DC POP. Depending on the services the traffic can take RSVP or SRTE tunnel in transient. This particular use-case talks about the RSVP use case</p><ul><li>In order to forward the packet remote CDN, server encapsulate the packet with a GRE header towards the CX node, along with a label to identify the BB node. This label would be statically configured on CX nodes.</li><li>When the packet reaches CX it decapsulate the packet first and then using the outer label forwards to the BB/BD node.</li><li>BB/BD node forwards the packets to RSVP tunnel towards remove BX network.</li></ul>"
    },
    {
      image:"Google_Image6.gif",
      imageDetails:"<p>Google is lately migrating some of their services to SRTE based&nbsp; network. Currently segment routing is enabled between BX network and in future it will get extended to CX nod. For time being they have a static mpls running between CX and BX to enable end to end SRTE flow.</p><p>This is how SRTE packet flows</p>"
    }],
    opticDetails: {
      ASR9K: {
        optics: "op1,op2,op3,op4",
      },
      NCS5500: {
        optics: "op5,op6,op7,op8",
      },
      NCS5K: {
        optics: "op11,op16,op17,op18",
      },
      "8000": {
        optics: "op12,op13,op15,op19",
      },
    },
    featureDetails: {
      BGP: {
        ASR9K: {
          roles: "BX,CX",
        },
        NCS5500: {
          roles: "BX",
        },
      },
      ISIS: {
        ASR9K: {
          roles: "BX,EC",
        },
      },
      ISIS1: {
        ASR9K: {
          roles: "BX,CX,EC",
        },
        NCS5500: {
          roles: "EC",
        },
      },
      ISIS2: {
        ASR9K: {
          roles: "BX,CX,EC",
        },
        NCS5500: {
          roles: "BX,CX,EC",
        },
      },
    },
    platformReleaseDetails:{
      "ASR9K": {
         vendors:"Cisco,Juniper",
         current_release:"7.1.2",
         next_release:"7.3.4"
       },
      "NCS5500": {
         vendors:"Cisco,Arista",
         current_release:"7.1.2",
         next_release:"7.3.4"
        },
       "NCS5K":{
         platform:"NCS5500",
        vendors:"Cisco,Arista",
         current_release:"7.1.2",
         next_release:"7.3.4"
       
       },
       "8000":{
        platform:"NCS5500",
       vendors:"Cisco,Arista",
        current_release:"7.1.2",
        next_release:"7.3.4"
      
      }
       
     },
    team: [
      {
        name: "abc",
        role: "",
        org: "marketing",
        CVT_POC: "true",
        designation: "abc designation",
        esc_lead: "",
        eng_sponser: "",
        cvt_mgr: "",
      },
      {
        name: "abc1",
        role: "",
        org: "CVT/AT",
        CVT_POC: "true",
        designation: "abc designation",
        esc_lead: "",
        eng_sponser: "",
        cvt_mgr: "",
      },
      {
        name: "abc2",
        role: "",
        org: "marketing",
        CVT_POC: "true",
        designation: "abc designation",
        esc_lead: "",
        eng_sponser: "",
        cvt_mgr: "",
      },
      {
        name: "abc3",
        role: "",
        org: "cvt/at",
        CVT_POC: "true",
        designation: "abc designation",
        esc_lead: "",
        eng_sponser: "",
        cvt_mgr: "",
      },
    ],
  },
];
