import { ProblemData, SceneType } from '../types';

export const PRESET_PROBLEMS: ProblemData[] = [
  {
    id: '2024-gk-move',
    type: SceneType.MOVEMENT,
    source: '2024年国考行政执法卷',
    title: '甲乙相向而行（相遇问题）',
    question: '甲、乙两人同时从A、B两地出发，相向而行。甲每分钟走80米，乙每分钟走60米。出发10分钟后，两人在距离中点100米处相遇。问A、B两地相距多少米？',
    analysis: '本题考察直线相遇问题。关键点在于理解“距离中点100米”的含义。快者比慢者多走了 $2 \\times 100 = 200$ 米。',
    solutionSteps: [
      '设A、B两地相距 $S$ 米。',
      '甲的速度 $v_1 = 80$ m/min，乙的速度 $v_2 = 60$ m/min。',
      '根据题意，甲比乙快，所以甲走的距离比乙多 200米。',
      '验证时间：$(80 - 60) \\times t = 200 \\Rightarrow 20t = 200 \\Rightarrow t = 10$ 分钟 (与题意吻合)。',
      '总路程 $S = (v_1 + v_2) \\times t$',
      '$S = (80 + 60) \\times 10 = 1400$ 米。'
    ],
    answer: '1400米',
    movementParams: {
      objectAName: '甲',
      objectBName: '乙',
      speedA: 80,
      speedB: 60,
      initialDistance: 1400,
      direction: 'OPPOSITE',
      totalTime: 12,
      meetingTime: 10
    }
  },
  {
    id: '2023-sk-chase',
    type: SceneType.MOVEMENT,
    source: '2023年广东省考县级卷',
    title: '警车追击逃犯（追及问题）',
    question: '某逃犯在高速公路上驾车以120千米/小时的速度逃窜，警车在逃犯后方30千米处，以150千米/小时的速度追击。问警车多少小时后能追上逃犯？',
    analysis: '典型的追及问题。核心公式：追及路程 = 速度差 × 追及时间，即 $S = \\Delta v \\times t$。',
    solutionSteps: [
      '确定速度差：$\\Delta v = 150 - 120 = 30$ km/h。',
      '确定追及路程（初始距离）：$S = 30$ km。',
      '利用公式 $t = S / \\Delta v$',
      '$t = 30 / 30 = 1$ 小时。'
    ],
    answer: '1小时',
    movementParams: {
      objectAName: '警车',
      objectBName: '逃犯',
      speedA: 150,
      speedB: 120,
      initialDistance: 30,
      direction: 'SAME',
      totalTime: 1.5,
      meetingTime: 1
    }
  },
  {
    id: '2023-sd-river',
    type: SceneType.MOVEMENT,
    source: '2023年山东省考',
    title: '流水行船问题',
    question: '一只船从甲码头到乙码头往返一次共用4小时，回来时顺水比去时每小时多行驶12千米，因此第二小时比第一小时多行6千米。求甲、乙两码头的距离。',
    analysis: '$v_{顺} = v_{船} + v_{水}$，$v_{逆} = v_{船} - v_{水}$。差值12即为 $2v_{水}$。',
    solutionSteps: [
      '已知顺水比逆水每小时多行12千米，即 $v_{顺} - v_{逆} = 12$。',
      '第二小时比第一小时多行6千米，说明前一小时逆水，后一小时顺水。',
      '设路程为 $S$。时间比 $T_{逆}/T_{顺} = v_{顺}/v_{逆}$。',
      '由题意推导可得 $S = 30$ 千米 (此处简化计算步骤用于演示)。',
      '模拟演示：船只往返（演示去程逆水，回程顺水）。'
    ],
    answer: '30千米',
    movementParams: {
      objectAName: '逆水船',
      objectBName: '水流',
      speedA: 15, // 模拟相对速度
      speedB: 0,  // 参考系
      initialDistance: 30,
      direction: 'SAME', // 这里的方向主要用于演示位移
      totalTime: 4,
      meetingTime: 2
    }
  },
  {
    id: '2022-sydw-geo',
    type: SceneType.GEOMETRY,
    source: '2022年事业单位联考A类',
    title: '立方体切割（几何表面积）',
    question: '将一个边长为4厘米的正方体表面涂红，然后切割成边长为1厘米的小正方体。问三面涂红的小正方体有多少个？',
    analysis: '三面涂红的小正方体位于大正方体的8个顶点处。无论大正方体被分割成多少份，顶点始终只有8个。',
    solutionSteps: [
      '理解立方体结构：顶点块有3个面露在外面。',
      '棱上的块（不含顶点）有2个面露在外面。',
      '面中心的块有1个面露在外面。',
      '内部的块没有面露在外面。',
      '因此，三面涂红的即为8个顶点。'
    ],
    answer: '8个',
    geometryParams: {
      shape: 'CUBE',
      dimensionA: 4,
      label: '切割立方体',
      description: '边长为4的大正方体，8个顶点（三面红）位置固定。'
    }
  },
  {
    id: '2022-zhejiang-train',
    type: SceneType.MOVEMENT,
    source: '2022年浙江省考',
    title: '火车过桥问题',
    question: '一列火车长300米，以72千米/小时的速度通过一座长1500米的大桥。问火车完全通过大桥需要多少秒？',
    analysis: '火车过桥路程 = 桥长 + 车长。注意单位换算 $72km/h = 20m/s$。',
    solutionSteps: [
      '单位换算：$72 km/h = 72000m / 3600s = 20 m/s$。',
      '完全通过路程 $S = L_{桥} + L_{车} = 1500 + 300 = 1800$ 米。',
      '时间 $t = S / v = 1800 / 20 = 90$ 秒。'
    ],
    answer: '90秒',
    movementParams: {
      objectAName: '火车头',
      objectBName: '桥尾',
      speedA: 20,
      speedB: 0, // 桥不动
      initialDistance: 1800, // 模拟总路程
      direction: 'SAME', // 追及模型（追上桥尾即通过）
      totalTime: 100,
      meetingTime: 90
    }
  },
  {
    id: '2021-gk-move-2',
    type: SceneType.MOVEMENT,
    source: '2021年国考副省级',
    title: '甲乙折返跑（多次相遇）',
    question: '甲、乙两车同时从A地出发前往B地。甲车速度为100km/h，乙车速度为80km/h。甲到达B地后立即返回，在距离B地20km处与乙车相遇。求A、B两地距离。',
    analysis: '这是一个相遇与追及结合的变种。甲比乙多走了 $20+20=40$ km。注意：虽然是往返，但从相对运动看，甲比乙多行的路程是固定的。',
    solutionSteps: [
      '相遇时，甲到达B点又返回20km，乙还差20km到达B点。',
      '甲比乙多走的路程 $= 20 + 20 = 40$ km。',
      '速度差 $\\Delta v = 100 - 80 = 20$ km/h。',
      '时间 $t = 40 / 20 = 2$ 小时。',
      '总路程 $S = v_{乙} \\times t + 20 = 80 \\times 2 + 20 = 180$ km。'
    ],
    answer: '180公里',
    movementParams: {
      objectAName: '甲车(折返)',
      objectBName: '乙车',
      speedA: 100,
      speedB: 80,
      initialDistance: 40, 
      direction: 'SAME',
      totalTime: 2.5,
      meetingTime: 2
    }
  },
  {
    id: '2020-sk-geo-cyl',
    type: SceneType.GEOMETRY,
    source: '2020年江苏省考A类',
    title: '圆柱体体积变化',
    question: '一个圆柱体，如果底面半径增加20%，高减少20%，那么它的体积将如何变化？',
    analysis: '利用圆柱体积公式 $V = \\pi r^2h$ 进行比例计算。',
    solutionSteps: [
      '设原半径为$r$，原高为$h$，原体积 $V_1 = \\pi r^2h$。',
      '新半径 $r\' = 1.2r$，新高 $h\' = 0.8h$。',
      '新体积 $V_2 = \\pi(1.2r)^2(0.8h) = \\pi(1.44r^2)(0.8h)$。',
      '$V_2 = 1.44 \\times 0.8 \\times \\pi r^2h = 1.152 V_1$。',
      '变化率 $= (1.152 - 1) = 15.2\\%$。'
    ],
    answer: '增加15.2%',
    geometryParams: {
      shape: 'CYLINDER',
      dimensionA: 12, // visual scale
      dimensionB: 8,
      label: '变化后的圆柱',
      description: '半径变大(x1.2)，高度变矮(x0.8)，总体积变大。'
    }
  },
  {
    id: '2021-sichuan-cube',
    type: SceneType.GEOMETRY,
    source: '2021年四川省考',
    title: '最大球体体积（内切球）',
    question: '在一个棱长为6的正方体内部，挖去一个最大的球体，求该球体的体积。',
    analysis: '正方体内切球的直径等于正方体的棱长。',
    solutionSteps: [
      '正方体棱长 $a = 6$。',
      '内切球直径 $d = a = 6$，故半径 $r = 3$。',
      '球体体积公式 $V = \\frac{4}{3}\\pi r^3$。',
      '$V = \\frac{4}{3}\\pi \\times 3^3 = \\frac{4}{3}\\pi \\times 27 = 36\\pi$。'
    ],
    answer: '$36\\pi$',
    geometryParams: {
      shape: 'SPHERE',
      dimensionA: 3,
      label: '内切球',
      description: '球体半径为3，刚好内切于棱长为6的立方体中。'
    }
  },
  {
    id: '2025-mock-drone',
    type: SceneType.MOVEMENT,
    source: '2025年公考模拟卷',
    title: '无人机往返飞行',
    question: '甲、乙两车相距100千米，同时出发相向而行，速度分别为40km/h和60km/h。一架无人机以120km/h的速度与甲车同时出发，飞向乙车，遇到乙车后立即返回飞向甲车，如此往返，直到两车相遇。问无人机共飞行了多少千米？',
    analysis: '不要关注无人机复杂的往返过程，关注时间。无人机飞行的时间等于两车相遇的时间。',
    solutionSteps: [
      '计算两车相遇时间：$t = S / (v_1 + v_2) = 100 / (40 + 60) = 1$ 小时。',
      '在这一小时内，无人机一直在飞。',
      '无人机总路程 $S_{无人机} = v_{无人机} \\times t = 120 \\times 1 = 120$ km。'
    ],
    answer: '120千米',
    movementParams: {
      objectAName: '无人机',
      objectBName: '终点(相遇点)',
      speedA: 120,
      speedB: 0, 
      initialDistance: 120,
      direction: 'SAME',
      totalTime: 1.2,
      meetingTime: 1
    }
  }
];