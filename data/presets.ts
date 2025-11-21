import { ProblemData, SceneType } from '../types';

export const PRESET_PROBLEMS: ProblemData[] = [
  // --- 原有 1-10 题 ---
  {
    id: '2024-gk-train-bridge',
    type: SceneType.MOVEMENT,
    source: '2024年国考模拟卷',
    title: '火车过桥问题',
    question: '一列火车长200米，以20米/秒的速度通过一座长1000米的大桥。问火车从车头刚上桥到车尾完全离开桥共需多少时间？',
    analysis: '火车完全通过大桥，行驶的路程 = 桥长 + 车长。这是一个典型的追及模型变种，或者视为“车尾追桥头”。',
    solutionSteps: [
      '确定总路程 $S = L_{桥} + L_{车}$。',
      '$S = 1000 + 200 = 1200$ 米。',
      '速度 $v = 20$ 米/秒。',
      '时间 $t = S / v = 1200 / 20 = 60$ 秒。'
    ],
    answer: '60秒',
    movementParams: {
      objectAName: '火车头',
      objectBName: '大桥',
      speedA: 20,
      speedB: 0,
      initialDistance: 1000,
      direction: 'SAME',
      totalTime: 70,
      meetingTime: 60
    }
  },
  {
    id: '2023-sk-chase-police',
    type: SceneType.MOVEMENT,
    source: '2023年省考行测',
    title: '警车追击问题',
    question: '一辆警车以80km/h的速度追击前方20km处的逃犯车辆。逃犯车辆的速度为60km/h。问警车需要多少小时才能追上逃犯？',
    analysis: '追及问题基本公式：$T = \\text{路程差} / \\text{速度差}$。',
    solutionSteps: [
      '速度差 $\\Delta v = 80 - 60 = 20$ km/h。',
      '路程差 $\\Delta S = 20$ km。',
      '时间 $t = 20 / 20 = 1$ 小时。'
    ],
    answer: '1小时',
    movementParams: {
      objectAName: '警车',
      objectBName: '逃犯',
      speedA: 80,
      speedB: 60,
      initialDistance: 20,
      direction: 'SAME',
      totalTime: 1.2,
      meetingTime: 1
    }
  },
  {
    id: '2022-sydw-meet-basic',
    type: SceneType.MOVEMENT,
    source: '2022年事业单位',
    title: '直线相遇问题',
    question: '甲、乙两车从相距300公里的A、B两地同时出发，相向而行。甲的速度是40km/h，乙的速度是60km/h。经过几小时两车相遇？',
    analysis: '相遇问题基本公式：$T = \\text{总路程} / \\text{速度和}$。',
    solutionSteps: [
      '速度和 $v_{和} = 40 + 60 = 100$ km/h。',
      '总路程 $S = 300$ km。',
      '时间 $t = 300 / 100 = 3$ 小时。'
    ],
    answer: '3小时',
    movementParams: {
      objectAName: '甲车',
      objectBName: '乙车',
      speedA: 40,
      speedB: 60,
      initialDistance: 300,
      direction: 'OPPOSITE',
      totalTime: 3.5,
      meetingTime: 3
    }
  },
  {
    id: '2023-river-boat',
    type: SceneType.MOVEMENT,
    source: '经典题库-流水行船',
    title: '流水行船问题',
    question: '某船在静水中的速度是20km/h，水流速度是4km/h。船从甲码头顺流而下到达乙码头用了2小时。求甲乙两码头的距离。',
    analysis: '顺流速度 = 船速 + 水速。距离 = 顺流速度 × 时间。',
    solutionSteps: [
      '顺流速度 $v_{顺} = 20 + 4 = 24$ km/h。',
      '时间 $t = 2$ 小时。',
      '距离 $S = 24 \\times 2 = 48$ km。'
    ],
    answer: '48千米',
    movementParams: {
      objectAName: '顺水船',
      objectBName: '岸边参考',
      speedA: 24,
      speedB: 0,
      initialDistance: 48,
      direction: 'SAME',
      totalTime: 2.5,
      meetingTime: 2
    }
  },
  {
    id: '2025-complex-meet',
    type: SceneType.MOVEMENT,
    source: '2025年国考预测',
    title: '二次相遇问题',
    question: '甲、乙两人同时从两地出发，相向而行。第一次相遇时距离A地60米。相遇后继续前进，到达对方起点后立即返回。第二次相遇时距离B地40米。求A、B两地的距离。',
    analysis: '单岸型二次相遇。第一次相遇共走1个全长S，第二次相遇共走3个全长3S。甲走的路程也应是倍数关系。',
    solutionSteps: [
      '设全程为S。',
      '第一次相遇，甲走了60米，两人共走S。',
      '第二次相遇，两人共走了3S，所以甲共走了 $3 \\times 60 = 180$ 米。',
      '此时甲的位置：到达B点折返40米，即 $S + 40 = 180$。',
      '$S = 140$ 米。'
    ],
    answer: '140米',
    movementParams: {
      objectAName: '甲',
      objectBName: '乙',
      speedA: 60,
      speedB: 80,
      initialDistance: 140,
      direction: 'OPPOSITE',
      totalTime: 3,
      meetingTime: 1
    }
  },
  {
    id: '2021-escalator',
    type: SceneType.MOVEMENT,
    source: '2021年省考',
    title: '扶梯运动问题',
    question: '商场自动扶梯向上运行，小明逆着扶梯向下走。小明每秒走3级台阶，扶梯每秒向上运行1级台阶。若扶梯可见部分共40级，小明走到底需要多少秒？',
    analysis: '逆行问题。人相对于地面的速度 = 人速 - 梯速。',
    solutionSteps: [
      '人相对于地面的位移速度 $v = 3 - 1 = 2$ 级/秒。',
      '路程（扶梯级数）$S = 40$ 级。',
      '时间 $t = 40 / 2 = 20$ 秒。'
    ],
    answer: '20秒',
    movementParams: {
      objectAName: '小明(逆)',
      objectBName: '扶梯终点',
      speedA: 2,
      speedB: 0,
      initialDistance: 40,
      direction: 'SAME',
      totalTime: 22,
      meetingTime: 20
    }
  },
  {
    id: '2020-team-march',
    type: SceneType.MOVEMENT,
    source: '2020年军队文职',
    title: '队伍行进问题',
    question: '一支长100米的队伍以2m/s的速度匀速前进。通讯员以6m/s的速度从队尾跑到队头传递文件。问通讯员追上队头需要多少时间？',
    analysis: '追及问题。通讯员追队头，路程差即为队伍长度。',
    solutionSteps: [
      '路程差 $S = 100$ 米。',
      '速度差 $\\Delta v = 6 - 2 = 4$ m/s。',
      '时间 $t = 100 / 4 = 25$ 秒。'
    ],
    answer: '25秒',
    movementParams: {
      objectAName: '通讯员',
      objectBName: '队头',
      speedA: 6,
      speedB: 2,
      initialDistance: 100,
      direction: 'SAME',
      totalTime: 30,
      meetingTime: 25
    }
  },
  {
    id: '2024-clock-hands',
    type: SceneType.MOVEMENT,
    source: '趣味数学题库',
    title: '时钟追及问题',
    question: '现在是3点整。问多少分钟后，分针第一次追上时针？',
    analysis: '时钟问题本质是环形追及。分针速度6度/分，时针0.5度/分。3点时相距90度。',
    solutionSteps: [
      '速度差 $\\Delta v = 6 - 0.5 = 5.5$ 度/分。',
      '初始路程差（角度）$S = 90$ 度。',
      '时间 $t = 90 / 5.5 = 180/11 \\approx 16.36$ 分。'
    ],
    answer: '16.36分',
    movementParams: {
      objectAName: '分针',
      objectBName: '时针',
      speedA: 6,
      speedB: 0.5,
      initialDistance: 90,
      direction: 'SAME',
      totalTime: 20,
      meetingTime: 16.36
    }
  },
  {
    id: '2022-tunnel-double',
    type: SceneType.MOVEMENT,
    source: '2022年北京公考',
    title: '双向隧道错车',
    question: '甲、乙两列火车分别长150米和200米，相向行驶在双轨隧道中。甲车速度20m/s，乙车速度15m/s。两车从车头相遇到车尾离开共需多少秒？',
    analysis: '错车问题（相向）。错车路程 = 两车车长之和。',
    solutionSteps: [
      '总路程 $S = 150 + 200 = 350$ 米。',
      '速度和 $v = 20 + 15 = 35$ m/s。',
      '时间 $t = 350 / 35 = 10$ 秒。'
    ],
    answer: '10秒',
    movementParams: {
      objectAName: '甲火车',
      objectBName: '乙火车',
      speedA: 20,
      speedB: 15,
      initialDistance: 350,
      direction: 'OPPOSITE',
      totalTime: 12,
      meetingTime: 10
    }
  },
  {
    id: '2021-dog-run',
    type: SceneType.MOVEMENT,
    source: '2021年江苏省考',
    title: '小狗折返跑',
    question: '甲乙两地相距200米，小红小明同时相向而行，速度分别为2m/s和3m/s。一只狗以6m/s的速度从小红处跑向小明，遇到小明后立即返回跑向小红。直到两人相遇。问狗跑了多少米？',
    analysis: '不需要算折返次数。狗跑的时间 = 人相遇的时间。',
    solutionSteps: [
      '人相遇时间 $t = 200 / (2 + 3) = 40$ 秒。',
      '狗一直在跑，且时间也是40秒。',
      '狗跑的路程 $S = 6 \\times 40 = 240$ 米。'
    ],
    answer: '240米',
    movementParams: {
      objectAName: '狗',
      objectBName: '相遇点',
      speedA: 6,
      speedB: 0, 
      initialDistance: 240,
      direction: 'SAME',
      totalTime: 45,
      meetingTime: 40
    }
  },

  // --- 新增 11-30 题 ---

  {
    id: '2024-gd-circular',
    type: SceneType.MOVEMENT,
    source: '2024年广东省考',
    title: '环形跑道相遇',
    question: '甲、乙两人在周长为400米的环形跑道上同一点背向出发。甲的速度是4米/秒，乙的速度是6米/秒。问出发后多少秒两人第三次相遇？',
    analysis: '环形背向相遇问题。每相遇一次，两人路程和等于一圈周长。第三次相遇则路程和为3圈。',
    solutionSteps: [
      '单次相遇路程和 $S_{圈} = 400$ 米。',
      '速度和 $v_{和} = 4 + 6 = 10$ 米/秒。',
      '第三次相遇总路程 $S_{总} = 3 \\times 400 = 1200$ 米。',
      '时间 $t = 1200 / 10 = 120$ 秒。'
    ],
    answer: '120秒',
    movementParams: {
      objectAName: '甲',
      objectBName: '乙',
      speedA: 4,
      speedB: 6,
      initialDistance: 1200, // 虚拟总路程
      direction: 'OPPOSITE',
      totalTime: 130,
      meetingTime: 120
    }
  },
  {
    id: '2023-gk-engineering-basic',
    type: SceneType.WORK, // 暂无Work可视化，会显示文字模式
    source: '2023年国考副省级',
    title: '基础工程问题',
    question: '一项工程，甲单独做需要10天完成，乙单独做需要15天完成。现甲先做4天，剩下的由乙单独做，还需要几天完成？',
    analysis: '设工作总量为时间最小公倍数（30）。效率计算后代入求解。',
    solutionSteps: [
      '设总量 $W = 30$。',
      '甲效率 $P_甲 = 30/10 = 3$，乙效率 $P_乙 = 30/15 = 2$。',
      '甲4天工作量 = $3 \\times 4 = 12$。',
      '剩余工作量 = $30 - 12 = 18$。',
      '乙需要天数 = $18 / 2 = 9$ 天。'
    ],
    answer: '9天'
  },
  {
    id: '2022-sydw-train-cross',
    type: SceneType.MOVEMENT,
    source: '2022年事业单位联考',
    title: '列车过人问题',
    question: '一列火车以72km/h的速度通过一根电线杆用了10秒。问这列火车的长度是多少米？',
    analysis: '列车过定点（电线杆），行驶路程即为车身长度。注意单位换算。',
    solutionSteps: [
      '速度换算：$72 \\text{km/h} = 72 / 3.6 = 20 \\text{m/s}$。',
      '时间 $t = 10$ 秒。',
      '车长 $L = v \\times t = 20 \\times 10 = 200$ 米。'
    ],
    answer: '200米',
    movementParams: {
      objectAName: '火车',
      objectBName: '电线杆',
      speedA: 20,
      speedB: 0,
      initialDistance: 200, 
      direction: 'SAME',
      totalTime: 12,
      meetingTime: 10
    }
  },
  {
    id: '2021-sd-profit',
    type: SceneType.WORK,
    source: '2021年山东省考',
    title: '经济利润问题',
    question: '某商品按20%利润定价，然后按八折出售，结果亏损了20元。问该商品的成本是多少元？',
    analysis: '利润率基本公式：售价 = 成本 × (1+利润率)。打折即乘以折扣率。',
    solutionSteps: [
      '设成本为 $x$。',
      '定价 = $1.2x$。',
      '售价 = $1.2x \\times 0.8 = 0.96x$。',
      '亏损 = 成本 - 售价，即 $x - 0.96x = 0.04x$。',
      '由题意 $0.04x = 20$，解得 $x = 500$。'
    ],
    answer: '500元'
  },
  {
    id: '2024-zj-meet-late',
    type: SceneType.MOVEMENT,
    source: '2024年浙江省考',
    title: '晚出发追及',
    question: '甲乙两地相距100千米。小张先骑摩托车从甲地出发前往乙地，速度40km/h。1小时后，小王驾驶汽车也从甲地去乙地，速度80km/h。问小王出发后多久追上小张？',
    analysis: '同向追及。路程差 = 先行者的位移。',
    solutionSteps: [
      '小张先行位移（路程差） $S = 40 \\times 1 = 40$ km。',
      '速度差 $\\Delta v = 80 - 40 = 40$ km/h。',
      '追及时间 $t = 40 / 40 = 1$ 小时。'
    ],
    answer: '1小时',
    movementParams: {
      objectAName: '小王(汽车)',
      objectBName: '小张(摩托)',
      speedA: 80,
      speedB: 40,
      initialDistance: 40, // Initial gap created by head start
      direction: 'SAME',
      totalTime: 1.5,
      meetingTime: 1
    }
  },
  {
    id: '2020-gk-solution',
    type: SceneType.WORK,
    source: '2020年国考地市级',
    title: '溶液混合问题',
    question: '甲容器中有浓度为4%的盐水150克，乙容器中有浓度为8%的盐水100克。混合后盐水的浓度是多少？',
    analysis: '混合浓度 = 总溶质 / 总溶液。',
    solutionSteps: [
      '甲溶质 = $150 \\times 0.04 = 6$ 克。',
      '乙溶质 = $100 \\times 0.08 = 8$ 克。',
      '总溶质 = $6 + 8 = 14$ 克。',
      '总溶液 = $150 + 100 = 250$ 克。',
      '浓度 = $14 / 250 = 5.6\\%$。'
    ],
    answer: '5.6%'
  },
  {
    id: '2023-js-boat-drift',
    type: SceneType.MOVEMENT,
    source: '2023年江苏省考A类',
    title: '漂流瓶问题',
    question: 'A、B两港间河流流速为3km/h。一只漂流瓶从A港顺流而下，经过10小时到达B港。一艘船从A港出发顺流而下，需2小时到达B港。问该船从B港返回A港需要多少小时？',
    analysis: '漂流瓶速度等于水速。顺流路程即AB距离。逆流时间=路程/(船速-水速)。',
    solutionSteps: [
      'AB距离 $S = v_{水} \\times t = 3 \\times 10 = 30$ km。',
      '船顺流速度 $v_{顺} = 30 / 2 = 15$ km/h。',
      '静水船速 $v_{船} = v_{顺} - v_{水} = 15 - 3 = 12$ km/h。',
      '逆流速度 $v_{逆} = 12 - 3 = 9$ km/h。',
      '返回时间 $t = 30 / 9 = 10/3$ 小时（约3.33小时）。'
    ],
    answer: '3.33小时',
    movementParams: {
      objectAName: '逆流船',
      objectBName: '参考点',
      speedA: 9,
      speedB: 0,
      initialDistance: 30,
      direction: 'SAME',
      totalTime: 4,
      meetingTime: 3.33
    }
  },
  {
    id: '2022-sc-stairs',
    type: SceneType.MOVEMENT,
    source: '2022年四川省考',
    title: '爬楼梯问题',
    question: '小明和小红比赛爬楼梯。小明跑到第4层时，小红刚好跑到第3层。按此速度，当小明跑到第16层时，小红跑到第几层？',
    analysis: '楼梯问题的关键是“楼层数-1”才是实际爬的高度。',
    solutionSteps: [
      '小明爬的高度：$4-1=3$ 个单位。',
      '小红爬的高度：$3-1=2$ 个单位。',
      '速度比 $v_{明}:v_{红} = 3:2$。',
      '当小明到16层，爬了 $16-1=15$ 个单位。',
      '小红爬的高度 $h = 15 \\times (2/3) = 10$ 个单位。',
      '小红所在楼层 = $10 + 1 = 11$ 层。'
    ],
    answer: '11层',
    movementParams: {
      objectAName: '小明',
      objectBName: '小红',
      speedA: 3,
      speedB: 2,
      initialDistance: 0, // Starting together
      direction: 'SAME', // Visualizing race
      totalTime: 6,
      meetingTime: 5 // Visual stop
    }
  },
  {
    id: '2025-mock-planting',
    type: SceneType.MOVEMENT,
    source: '2025年模考大赛',
    title: '植树间隔问题',
    question: '在一条长200米的道路一侧植树，每隔5米种一棵。如果两端都种，共需要种多少棵树？',
    analysis: '两端植树公式：棵数 = 总长 / 间隔 + 1。',
    solutionSteps: [
      '间隔数 $n = 200 / 5 = 40$ 个。',
      '树的数量 = $40 + 1 = 41$ 棵。'
    ],
    answer: '41棵',
    movementParams: {
      objectAName: '种树进度',
      objectBName: '终点',
      speedA: 40, // visual speed
      speedB: 0,
      initialDistance: 200,
      direction: 'SAME',
      totalTime: 6,
      meetingTime: 5
    }
  },
  {
    id: '2021-hn-cow-grass',
    type: SceneType.WORK,
    source: '2021年湖南省考',
    title: '牛吃草问题',
    question: '一片牧场，草每天匀速生长。这片草可供10头牛吃20天，或供15头牛吃10天。问可供25头牛吃多少天？',
    analysis: '典型牛吃草公式：$Y = (N - x) \\times T$。设每头牛吃草速度为1。',
    solutionSteps: [
      '设原有草量为 $Y$，生长速度为 $x$。',
      '方程1：$Y = (10 - x) \\times 20$。',
      '方程2：$Y = (15 - x) \\times 10$。',
      '解得 $x = 5$，$Y = 100$。',
      '设25头牛吃 $t$ 天：$100 = (25 - 5) \\times t$。',
      '$100 = 20t \\Rightarrow t = 5$ 天。'
    ],
    answer: '5天'
  },
  {
    id: '2023-army-bridge',
    type: SceneType.MOVEMENT,
    source: '2023年军队文职',
    title: '部队过桥',
    question: '一支队伍长1200米，以5km/h的速度通过一座全长800米的大桥。求队伍完全通过大桥需要多少分钟？',
    analysis: '完全通过 = 车长(队长) + 桥长。',
    solutionSteps: [
      '总路程 $S = 1200 + 800 = 2000$ 米 = 2 km。',
      '速度 $v = 5$ km/h。',
      '时间 $t = 2 / 5 = 0.4$ 小时。',
      '换算分钟：$0.4 \\times 60 = 24$ 分钟。'
    ],
    answer: '24分钟',
    movementParams: {
      objectAName: '队伍头',
      objectBName: '桥',
      speedA: 5,
      speedB: 0,
      initialDistance: 800,
      direction: 'SAME',
      totalTime: 0.5,
      meetingTime: 0.4
    }
  },
  {
    id: '2020-bj-circle-chase',
    type: SceneType.MOVEMENT,
    source: '2020年北京公考',
    title: '环形追及',
    question: '一条环形赛道长400米，甲骑行速度20m/s，乙骑行速度16m/s。两人同时同地同向出发，经过多少秒甲第一次追上乙？',
    analysis: '环形同向追及。每追上一次，快者比慢者多跑一圈（路程差为周长）。',
    solutionSteps: [
      '路程差 $\\Delta S = 400$ 米。',
      '速度差 $\\Delta v = 20 - 16 = 4$ m/s。',
      '时间 $t = 400 / 4 = 100$ 秒。'
    ],
    answer: '100秒',
    movementParams: {
      objectAName: '甲',
      objectBName: '乙',
      speedA: 20,
      speedB: 16,
      initialDistance: 400, // Visualized as gap to close
      direction: 'SAME',
      totalTime: 110,
      meetingTime: 100
    }
  },
  {
    id: '2024-sh-work-efficiency',
    type: SceneType.WORK,
    source: '2024年上海市考',
    title: '效率变化工程',
    question: '某工程甲队单独做需30天。甲队做10天后，技术革新使效率提高50%，问还需要几天完成剩余工程？',
    analysis: '设原效率为1，提高后效率为1.5。',
    solutionSteps: [
      '总量 $W = 30 \\times 1 = 30$。',
      '已做工作量 $1 \\times 10 = 10$。剩余 $20$。',
      '新效率 $1 \\times (1 + 0.5) = 1.5$。',
      '剩余天数 $t = 20 / 1.5 = 40/3 \\approx 13.3$ 天。'
    ],
    answer: '13.3天'
  },
  {
    id: '2022-gz-average-speed',
    type: SceneType.MOVEMENT,
    source: '2022年贵州省考',
    title: '平均速度问题',
    question: '老张开车上山速度为30km/h，原路下山速度为60km/h。求老张往返的平均速度？',
    analysis: '等距离平均速度公式：$v_{avg} = \\frac{2v_1v_2}{v_1+v_2}$。',
    solutionSteps: [
      '代入公式：$v = \\frac{2 \\times 30 \\times 60}{30 + 60}$。',
      '分子 $3600$，分母 $90$。',
      '$v = 3600 / 90 = 40$ km/h。'
    ],
    answer: '40km/h',
    movementParams: {
      objectAName: '上山',
      objectBName: '下山',
      speedA: 30,
      speedB: 60,
      initialDistance: 60,
      direction: 'SAME', // Visual comparison
      totalTime: 3,
      meetingTime: 2
    }
  },
  {
    id: '2021-cq-cube-paint',
    type: SceneType.GEOMETRY,
    source: '2021年重庆省考',
    title: '立方体涂色',
    question: '一个棱长为3的大立方体表面涂满红色，将其切割成27个棱长为1的小立方体。问三面涂红的小立方体有多少个？',
    analysis: '三面涂红的在8个顶点处。',
    solutionSteps: [
      '三面涂红：位于8个顶点，共8个。',
      '两面涂红：位于12条棱中间，每条棱有 $3-2=1$ 个，共12个。',
      '一面涂红：位于6个面中心，每个面 $(3-2)^2=1$ 个，共6个。',
      '答案为8个。'
    ],
    answer: '8个',
    geometryParams: {
      shape: 'CUBE',
      dimensionA: 3,
      label: '切割立方体',
      description: '3x3x3 堆叠'
    }
  },
  {
    id: '2023-hebei-age',
    type: SceneType.WORK,
    source: '2023年河北省考',
    title: '年龄倍数问题',
    question: '父亲今年30岁，儿子今年4岁。问多少年后父亲的年龄是儿子的3倍？',
    analysis: '年龄差不变原理。差 = 30 - 4 = 26岁。',
    solutionSteps: [
      '设 $x$ 年后满足条件。',
      '$(30+x) = 3 \\times (4+x)$。',
      '$30+x = 12+3x$。',
      '$18 = 2x \\Rightarrow x = 9$。'
    ],
    answer: '9年后'
  },
  {
    id: '2025-train-tunnel-light',
    type: SceneType.MOVEMENT,
    source: '2025年公考必刷',
    title: '火车隧道灯光',
    question: '火车在黑暗的隧道中行驶，车窗外每隔2秒就闪过一盏灯。已知相邻两盏灯间隔30米。求火车的速度。',
    analysis: '路程=间隔，时间=2s。简单路程公式。',
    solutionSteps: [
      '路程 $S = 30$ 米。',
      '时间 $t = 2$ 秒。',
      '速度 $v = 30 / 2 = 15$ m/s。',
      '换算时速：$15 \\times 3.6 = 54$ km/h。'
    ],
    answer: '54km/h',
    movementParams: {
      objectAName: '火车',
      objectBName: '灯光',
      speedA: 15,
      speedB: 0,
      initialDistance: 60, // Show movement past 2 lights
      direction: 'SAME',
      totalTime: 5,
      meetingTime: 4
    }
  },
  {
    id: '2020-jiangxi-clock',
    type: SceneType.MOVEMENT,
    source: '2020年江西省考',
    title: '坏钟问题',
    question: '一只挂钟每小时慢5分钟。标准时间中午12点校准，当挂钟显示下午5点时，标准时间是多少？',
    analysis: '速度比问题。标准钟走60分，挂钟走55分。',
    solutionSteps: [
      '速度比 $v_{标}:v_{挂} = 60:55 = 12:11$。',
      '挂钟走了 $5$ 小时（12点到5点）。',
      '标准时间走的时间 $T = 5 \\times (12/11) = 60/11 \\approx 5.45$ 小时。',
      '即下午 5点27分左右。'
    ],
    answer: '17:27',
    movementParams: {
      objectAName: '标准表',
      objectBName: '慢表',
      speedA: 60,
      speedB: 55,
      initialDistance: 0,
      direction: 'SAME',
      totalTime: 6,
      meetingTime: 5
    }
  },
  {
    id: '2022-hubei-shadow',
    type: SceneType.GEOMETRY,
    source: '2022年湖北省考',
    title: '几何相似问题',
    question: '一根2米长的竹竿立在地上，影长1.5米。同时测得旁边一座电线杆的影长为12米。问电线杆的高度？',
    analysis: '同一时刻，物高与影长成正比。',
    solutionSteps: [
      '设电线杆高 $H$。',
      '$2 / 1.5 = H / 12$。',
      '$H = (2 \\times 12) / 1.5 = 24 / 1.5 = 16$ 米。'
    ],
    answer: '16米',
    geometryParams: {
      shape: 'CYLINDER',
      dimensionA: 1,
      dimensionB: 16,
      label: '电线杆',
      description: '高16米'
    }
  },
  {
    id: '2024-final-relay',
    type: SceneType.MOVEMENT,
    source: '2024年事业单位统考',
    title: '接力跑追及',
    question: '甲乙两个接力队在400米环形跑道比赛。甲队第一棒速度5m/s，乙队第一棒4m/s。乙队先跑20米后甲队才出发。问甲队第一棒跑多少米能追上乙队？',
    analysis: '追及问题。需追上的距离包括先跑的20米。',
    solutionSteps: [
      '路程差 $S = 20$ 米。',
      '速度差 $\\Delta v = 5 - 4 = 1$ m/s。',
      '追及时间 $t = 20 / 1 = 20$ 秒。',
      '甲跑的路程 $L = 5 \\times 20 = 100$ 米。'
    ],
    answer: '100米',
    movementParams: {
      objectAName: '甲队',
      objectBName: '乙队',
      speedA: 5,
      speedB: 4,
      initialDistance: 20,
      direction: 'SAME',
      totalTime: 25,
      meetingTime: 20
    }
  }
];
