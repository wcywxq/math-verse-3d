import { ProblemData, SceneType } from '../types';

export const PRESET_PROBLEMS: ProblemData[] = [
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
      objectBName: '大桥', // Static object
      speedA: 20,
      speedB: 0,
      initialDistance: 1000, // Visual gap
      direction: 'SAME', // Effectively moving through
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
      speedA: 24, // 20+4
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
      speedA: 60, // 相对概念，第一次相遇走了60
      speedB: 80, // 假设S=140，乙走了80
      initialDistance: 140,
      direction: 'OPPOSITE',
      totalTime: 3, // 模拟多次
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
      speedA: 2, // Net speed
      speedB: 0,
      initialDistance: 40, // stairs
      direction: 'SAME', // Walking down to bottom
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
      initialDistance: 100, // 队尾到队头的距离
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
      initialDistance: 90, // Degrees, represented linearly
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
      initialDistance: 350, // Represents lengths sum logic visually
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
      objectBName: '相遇点', // Virtual target
      speedA: 6,
      speedB: 0, 
      initialDistance: 240,
      direction: 'SAME',
      totalTime: 45,
      meetingTime: 40
    }
  }
];
