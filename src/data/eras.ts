import { GeologicalEra } from '../types'

export const GEOLOGICAL_ERAS: GeologicalEra[] = [
  {
    id: 'holocene',
    name: '全新世',
    nameEn: 'Holocene',
    startMya: 0.0117,
    endMya: 0,
    color: '#90EE90',
    colorLight: '#98FB98',
    description: '当前地质年代，人类文明发展时期',
    events: ['人类文明兴起', '气候变暖', '生物大灭绝事件']
  },
  {
    id: 'pleistocene',
    name: '更新世',
    nameEn: 'Pleistocene',
    startMya: 2.58,
    endMya: 0.0117,
    color: '#B0E0E6',
    colorLight: '#ADD8E6',
    description: '冰河时期，大型哺乳动物繁盛',
    events: ['多次冰期', '猛犸象、剑齿虎', '智人出现']
  },
  {
    id: 'pliocene',
    name: '上新世',
    nameEn: 'Pliocene',
    startMya: 5.333,
    endMya: 2.58,
    color: '#FFE4B5',
    colorLight: '#FFEFD5',
    description: '气候变冷，草原扩张，人科动物出现',
    events: ['南北美洲连接', '南方古猿出现', '草原生态系统']
  },
  {
    id: 'miocene',
    name: '中新世',
    nameEn: 'Miocene',
    startMya: 23.03,
    endMya: 5.333,
    color: '#DEB887',
    colorLight: '#F5DEB3',
    description: '哺乳动物快速进化，森林向草原转变',
    events: ['喜马拉雅山脉形成', '类人猿出现', 'C4植物扩张']
  },
  {
    id: 'oligocene',
    name: '渐新世',
    nameEn: 'Oligocene',
    startMya: 33.9,
    endMya: 23.03,
    color: '#DAA520',
    colorLight: '#EEE8AA',
    description: '全球降温，现代动植物群开始出现',
    events: ['南极冰盖形成', '草原出现', '现代哺乳动物目']
  },
  {
    id: 'eocene',
    name: '始新世',
    nameEn: 'Eocene',
    startMya: 56,
    endMya: 33.9,
    color: '#9ACD32',
    colorLight: '#ADFF2F',
    description: '最热的地质时期之一，哺乳动物辐射演化',
    events: ['古新世-始新世极热事件', '最早的马', '鲸鱼进入海洋']
  },
  {
    id: 'paleocene',
    name: '古新世',
    nameEn: 'Paleocene',
    startMya: 66,
    endMya: 56,
    color: '#8FBC8F',
    colorLight: '#90EE90',
    description: '恐龙灭绝后哺乳动物开始繁盛',
    events: ['白垩纪-古近纪灭绝事件', '哺乳动物辐射', '被子植物繁盛']
  },
  {
    id: 'cretaceous',
    name: '白垩纪',
    nameEn: 'Cretaceous',
    startMya: 145,
    endMya: 66,
    color: '#228B22',
    colorLight: '#32CD32',
    description: '恐龙鼎盛时期，被子植物出现',
    events: ['霸王龙出现', '开花植物演化', 'K-Pg大灭绝']
  },
  {
    id: 'jurassic',
    name: '侏罗纪',
    nameEn: 'Jurassic',
    startMya: 201.3,
    endMya: 145,
    color: '#3CB371',
    colorLight: '#66CDAA',
    description: '恐龙统治地球，鸟类出现',
    events: ['巨型蜥脚类恐龙', '始祖鸟出现', '盘古大陆分裂']
  },
  {
    id: 'triassic',
    name: '三叠纪',
    nameEn: 'Triassic',
    startMya: 252.17,
    endMya: 201.3,
    color: '#B22222',
    colorLight: '#CD5C5C',
    description: '恐龙和哺乳动物的祖先出现',
    events: ['二叠纪-三叠纪灭绝事件', '最早的恐龙', '最早的哺乳动物']
  },
  {
    id: 'paleozoic',
    name: '古生代',
    nameEn: 'Paleozoic',
    startMya: 541,
    endMya: 252.17,
    color: '#8B008B',
    colorLight: '#9932CC',
    description: '生命大爆发，海洋生物登陆',
    events: ['寒武纪生命大爆发', '鱼类时代', '两栖动物登陆', '蕨类森林']
  },
  {
    id: 'precambrian',
    name: '前寒武纪',
    nameEn: 'Precambrian',
    startMya: 4540,
    endMya: 541,
    color: '#4B0082',
    colorLight: '#6A5ACD',
    description: '地球形成到复杂生命出现前的漫长时期',
    events: ['地球形成', '生命起源', '大氧化事件', '埃迪卡拉生物群']
  }
]

export const ERA_ORDER = GEOLOGICAL_ERAS.map(era => era.id)
