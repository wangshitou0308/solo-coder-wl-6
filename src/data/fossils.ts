import { Fossil } from '../types'

const simpleShell = 'M20,40 Q10,30 15,15 Q25,5 35,15 Q40,30 30,40 Q25,42 20,40'
const simpleLeaf = 'M25,5 Q40,20 35,40 Q25,45 15,40 Q10,20 25,5 M25,10 L25,40'
const simpleBone = 'M10,25 L40,25 M10,25 Q5,15 12,10 Q18,12 15,22 M10,25 Q5,35 12,40 Q18,38 15,28 M40,25 Q45,15 38,10 Q32,12 35,22 M40,25 Q45,35 38,40 Q32,38 35,28'
const simpleAmmonite = 'M25,25 m-20,0 a20,20 0 1,1 40,0 a20,20 0 1,1 -40,0 M25,25 m-12,0 a12,12 0 1,1 24,0 a12,12 0 1,1 -24,0 M25,25 m-6,0 a6,6 0 1,1 12,0 a6,6 0 1,1 -12,0'
const simpleCrystal = 'M25,5 L40,20 L40,35 L25,45 L10,35 L10,20 Z'
const simpleTrilobite = 'M10,25 Q25,15 40,25 Q45,35 25,40 Q5,35 10,25 M20,20 L20,40 M30,20 L30,40'
const simpleDinosaur = 'M15,35 L20,25 L35,25 L40,35 L35,40 L20,40 Z M35,25 L42,20 M18,30 L12,28'
const simpleFish = 'M10,25 L35,25 L45,15 L45,35 Z M35,25 m-5,0 a5,5 0 1,1 10,0 a5,5 0 1,1 -10,0'
const simpleFern = 'M25,45 L25,10 M20,35 L10,30 M20,28 L8,20 M20,20 L10,12 M30,35 L40,30 M30,28 L42,20 M30,20 L40,12'
const simpleDinosaurTooth = 'M20,40 L25,10 L30,40 Z M22,40 L25,15 L28,40'

export const FOSSILS: Fossil[] = [
  { id: 'human_artifact', name: '古人类石器', nameEn: 'Human Artifact', type: 'mineral', eraId: 'holocene', rarity: 'common', description: '史前人类使用的打制石器，见证了人类文明的曙光。', funFact: '最早的石器可追溯到330万年前。', svgPath: 'M15,40 L20,10 L35,25 L30,40 Z', width: 50, height: 50 },
  { id: 'mammoth_bone', name: '猛犸象骨骼', nameEn: 'Mammoth Bone', type: 'animal', eraId: 'pleistocene', rarity: 'uncommon', description: '冰河时期巨兽猛犸象的骨骼化石，冰层中保存完好。', funFact: '猛犸象的象牙可长达5米。', svgPath: simpleBone, width: 50, height: 50 },
  { id: 'saber_tooth', name: '剑齿虎牙齿', nameEn: 'Saber Tooth', type: 'animal', eraId: 'pleistocene', rarity: 'rare', description: '刃齿虎的巨大犬齿，是冰河时期顶级掠食者的标志。', funFact: '剑齿虎的犬齿可达28厘米长。', svgPath: simpleDinosaurTooth, width: 50, height: 50 },
  { id: 'woolly_rhino', name: '披毛犀角', nameEn: 'Woolly Rhino Horn', type: 'animal', eraId: 'pleistocene', rarity: 'uncommon', description: '适应寒冷气候的披毛犀的角，表面有独特的纹理。', funFact: '披毛犀的角由角蛋白构成，与人类指甲相同。', svgPath: 'M25,45 Q20,25 25,5 Q30,25 25,45', width: 50, height: 50 },
  { id: 'australopithecus', name: '南方古猿头骨', nameEn: 'Australopithecus Skull', type: 'animal', eraId: 'pliocene', rarity: 'rare', description: '最早的人科动物之一，"露西"即属于此类。', funFact: '南方古猿已能直立行走。', svgPath: 'M25,15 m-15,0 a15,18 0 1,1 30,0 a15,18 0 1,1 -30,0', width: 50, height: 50 },
  { id: 'ancient_horse', name: '始祖马骨骼', nameEn: 'Ancient Horse Bone', type: 'animal', eraId: 'eocene', rarity: 'uncommon', description: '最早的马类，只有狐狸大小，生活在森林中。', funFact: '始祖马有4个脚趾，现代马只有1个。', svgPath: simpleBone, width: 50, height: 50 },
  { id: 'early_whale', name: '早期鲸鱼化石', nameEn: 'Early Whale Fossil', type: 'animal', eraId: 'eocene', rarity: 'epic', description: '巴基斯坦古鲸，鲸鱼从陆地返回海洋的过渡物种。', funFact: '鲸鱼的祖先曾是陆地动物，有四肢。', svgPath: simpleFish, width: 50, height: 50 },
  { id: 'amber_insect', name: '琥珀昆虫', nameEn: 'Amber Insect', type: 'animal', eraId: 'paleocene', rarity: 'rare', description: '被树脂包裹并石化的远古昆虫，保存极其完整。', funFact: '琥珀中的DNA理论上可保存数千万年。', svgPath: 'M15,10 Q25,5 35,10 Q40,25 35,40 Q25,45 15,40 Q10,25 15,10', width: 50, height: 50 },
  { id: 'tyrannosaur_tooth', name: '霸王龙牙齿', nameEn: 'T-Rex Tooth', type: 'animal', eraId: 'cretaceous', rarity: 'epic', description: '地表最强掠食者霸王龙的香蕉大小的牙齿。', funFact: '霸王龙的咬合力可达6吨。', svgPath: simpleDinosaurTooth, width: 50, height: 50 },
  { id: 'triceratops', name: '三角龙颈盾', nameEn: 'Triceratops Frill', type: 'animal', eraId: 'cretaceous', rarity: 'rare', description: '三角龙标志性的颈盾化石，可能用于展示和防御。', funFact: '三角龙的颈盾上可能覆盖有角质层。', svgPath: 'M10,25 Q25,5 40,25 Q35,45 25,40 Q15,45 10,25', width: 50, height: 50 },
  { id: 'velociraptor', name: '迅猛龙爪', nameEn: 'Velociraptor Claw', type: 'animal', eraId: 'cretaceous', rarity: 'rare', description: '驰龙科的标志性镰刀状第二趾爪，用于猎杀。', funFact: '迅猛龙其实只有火鸡大小，且长满羽毛。', svgPath: 'M15,40 Q25,10 35,25 Q25,35 15,40', width: 50, height: 50 },
  { id: 'archaeopteryx', name: '始祖鸟化石', nameEn: 'Archaeopteryx', type: 'animal', eraId: 'jurassic', rarity: 'legendary', description: '连接恐龙与鸟类的关键过渡物种，长有羽毛和牙齿。', funFact: '始祖鸟的发现证明了鸟类是恐龙的后代。', svgPath: 'M10,30 L30,25 L45,15 L30,30 L40,40 L25,35 L10,40 Z', width: 50, height: 50 },
  { id: 'brachiosaurus', name: '腕龙椎骨', nameEn: 'Brachiosaurus Vertebra', type: 'animal', eraId: 'jurassic', rarity: 'epic', description: '地球上最大的动物之一腕龙的巨大椎骨。', funFact: '腕龙的身高可达13米，相当于4层楼。', svgPath: 'M20,10 L30,10 L35,25 L30,40 L20,40 L15,25 Z', width: 50, height: 50 },
  { id: 'stegosaurus', name: '剑龙剑板', nameEn: 'Stegosaurus Plate', type: 'animal', eraId: 'jurassic', rarity: 'rare', description: '剑龙背部的骨板，可能用于体温调节和展示。', funFact: '剑龙的大脑只有核桃大小。', svgPath: 'M20,40 Q25,5 30,40 Q25,35 20,40', width: 50, height: 50 },
  { id: 'coelophysis', name: '腔骨龙骨骼', nameEn: 'Coelophysis Bone', type: 'animal', eraId: 'triassic', rarity: 'uncommon', description: '最早的小型肉食恐龙之一，骨骼中空，行动敏捷。', funFact: '腔骨龙可能是群居动物。', svgPath: simpleBone, width: 50, height: 50 },
  { id: 'early_mammal', name: '早期哺乳动物', nameEn: 'Early Mammal Jaw', type: 'animal', eraId: 'triassic', rarity: 'rare', description: '恐龙时代的早期哺乳动物，体型如鼩鼱。', funFact: '哺乳动物与恐龙几乎同时出现。', svgPath: 'M10,30 Q25,25 40,30 Q35,40 25,42 Q15,40 10,30', width: 50, height: 50 },
  { id: 'trilobite', name: '三叶虫化石', nameEn: 'Trilobite', type: 'animal', eraId: 'paleozoic', rarity: 'uncommon', description: '古生代最具代表性的节肢动物，种类繁多。', funFact: '三叶虫是第一种进化出复眼的生物。', svgPath: simpleTrilobite, width: 50, height: 50 },
  { id: 'ammonite', name: '菊石', nameEn: 'Ammonite', type: 'animal', eraId: 'paleozoic', rarity: 'common', description: '已灭绝的头足类动物，壳呈螺旋状，是重要的标准化石。', funFact: '菊石与恐龙同时灭绝。', svgPath: simpleAmmonite, width: 50, height: 50 },
  { id: 'dunkleosteus', name: '邓氏鱼骨板', nameEn: 'Dunkleosteus Plate', type: 'animal', eraId: 'paleozoic', rarity: 'epic', description: '泥盆纪海洋顶级掠食者，体长可达8-10米。', funFact: '邓氏鱼没有牙齿，但有锋利的骨板。', svgPath: 'M10,20 Q25,10 40,20 Q35,40 25,42 Q15,40 10,20', width: 50, height: 50 },
  { id: 'giant_fern', name: '巨型蕨类化石', nameEn: 'Giant Fern', type: 'plant', eraId: 'paleozoic', rarity: 'common', description: '石炭纪形成煤炭森林的主要植物之一。', funFact: '我们今天使用的煤炭主要来自石炭纪。', svgPath: simpleFern, width: 50, height: 50 },
  { id: 'graptolite', name: '笔石', nameEn: 'Graptolite', type: 'animal', eraId: 'paleozoic', rarity: 'uncommon', description: '已灭绝的浮游生物，是奥陶纪和志留纪的重要标准化石。', funFact: '笔石的名字意为"书写在岩石上的文字"。', svgPath: 'M10,25 Q20,15 30,25 Q40,35 45,25', width: 50, height: 50 },
  { id: 'stromatolite', name: '叠层石', nameEn: 'Stromatolite', type: 'mineral', eraId: 'precambrian', rarity: 'uncommon', description: '蓝藻等微生物形成的层状沉积构造，是最古老的生命证据。', funFact: '最古老的叠层石有35亿年历史。', svgPath: 'M10,40 L10,30 L15,30 L15,22 L22,22 L22,15 L30,15 L30,22 L38,22 L38,30 L42,30 L42,40 Z', width: 50, height: 50 },
  { id: 'ediacara_fossil', name: '埃迪卡拉生物群', nameEn: 'Ediacaran Biota', type: 'animal', eraId: 'precambrian', rarity: 'rare', description: '寒武纪之前的多细胞生物，形态奇特，亲缘关系不明。', funFact: '埃迪卡拉生物可能是动物演化的一次失败尝试。', svgPath: 'M15,25 Q25,5 35,25 Q35,45 25,42 Q15,45 15,25', width: 50, height: 50 },
  { id: 'banded_iron', name: '条带状铁建造', nameEn: 'Banded Iron Formation', type: 'mineral', eraId: 'precambrian', rarity: 'common', description: '大氧化事件的产物，是全球铁矿的主要来源。', funFact: '条带状铁建造记录了地球大气首次出现氧气的时期。', svgPath: 'M10,15 L40,15 M10,25 L40,25 M10,35 L40,35', width: 50, height: 50 },
  { id: 'amber_fossil', name: '缅甸琥珀', nameEn: 'Burmese Amber', type: 'mineral', eraId: 'cretaceous', rarity: 'rare', description: '白垩纪的琥珀，常包含保存精美的古生物。', funFact: '缅甸琥珀中曾发现完整的恐龙羽毛。', svgPath: 'M20,10 Q30,5 38,15 Q42,30 38,42 Q25,48 12,42 Q8,25 20,10', width: 50, height: 50 },
  { id: 'dinosaur_egg', name: '恐龙蛋化石', nameEn: 'Dinosaur Egg', type: 'animal', eraId: 'cretaceous', rarity: 'rare', description: '恐龙产下的蛋化石，有时能保存胚胎。', funFact: '恐龙蛋的形状和大小因种类而异。', svgPath: 'M20,45 Q15,25 25,10 Q35,25 30,45 Q25,48 20,45', width: 50, height: 50 },
  { id: 'mosasaur', name: '沧龙牙齿', nameEn: 'Mosasaur Tooth', type: 'animal', eraId: 'cretaceous', rarity: 'uncommon', description: '白垩纪海洋霸主沧龙的锋利牙齿。', funFact: '沧龙与现代蜥蜴有亲缘关系。', svgPath: simpleDinosaurTooth, width: 50, height: 50 },
  { id: 'pterosaur', name: '翼龙骨骼', nameEn: 'Pterosaur Bone', type: 'animal', eraId: 'cretaceous', rarity: 'rare', description: '第一种会飞的脊椎动物，翼展可达10米以上。', funFact: '翼龙不是恐龙，而是恐龙的近亲。', svgPath: simpleBone, width: 50, height: 50 },
  { id: 'seashell', name: '海贝壳化石', nameEn: 'Fossil Seashell', type: 'animal', eraId: 'pliocene', rarity: 'common', description: '远古海洋中的双壳类贝壳化石。', funFact: '贝壳化石常用于确定地层年代。', svgPath: simpleShell, width: 50, height: 50 },
  { id: 'shark_tooth', name: '鲨鱼牙齿', nameEn: 'Shark Tooth', type: 'animal', eraId: 'miocene', rarity: 'common', description: '巨齿鲨等远古鲨鱼的牙齿，是常见的化石收藏品。', funFact: '巨齿鲨的牙齿可达18厘米长。', svgPath: simpleDinosaurTooth, width: 50, height: 50 },
  { id: 'petrified_wood', name: '硅化木', nameEn: 'Petrified Wood', type: 'plant', eraId: 'miocene', rarity: 'common', description: '树木被矿物质取代后形成的化石，保留了木质结构。', funFact: '硅化木可以像普通石头一样被切割和抛光。', svgPath: 'M20,5 L20,45 M30,5 L30,45 M15,15 L35,15 M15,25 L35,25 M15,35 L35,35', width: 50, height: 50 },
  { id: 'mastodon', name: '乳齿象臼齿', nameEn: 'Mastodon Molar', type: 'animal', eraId: 'pliocene', rarity: 'uncommon', description: '乳齿象的牙齿，与猛犸象不同的史前长鼻目动物。', funFact: '乳齿象比猛犸象更原始。', svgPath: 'M10,25 Q25,15 40,25 Q40,40 25,42 Q10,40 10,25', width: 50, height: 50 },
  { id: 'giant_sloth', name: '大地懒骨骼', nameEn: 'Giant Sloth Bone', type: 'animal', eraId: 'pleistocene', rarity: 'uncommon', description: '身高可达6米的巨型地懒，是冰河时期最大的哺乳动物之一。', funFact: '大地懒可以用后肢站立取食树叶。', svgPath: simpleBone, width: 50, height: 50 },
  { id: 'cave_bear', name: '洞熊头骨', nameEn: 'Cave Bear Skull', type: 'animal', eraId: 'pleistocene', rarity: 'uncommon', description: '生活在冰河时期欧洲洞穴中的巨型熊类。', funFact: '洞熊大部分时间可能在洞穴中冬眠。', svgPath: 'M20,15 m-12,0 a12,15 0 1,1 24,0 a12,15 0 1,1 -24,0 M14,30 L14,38 M36,30 L36,38', width: 50, height: 50 },
  { id: 'deinotherium', name: '恐象骨骼', nameEn: 'Deinotherium Bone', type: 'animal', eraId: 'miocene', rarity: 'rare', description: '下巴长有向下弯曲獠牙的史前长鼻目动物。', funFact: '恐象是有史以来最大的陆生哺乳动物之一。', svgPath: simpleBone, width: 50, height: 50 },
  { id: 'chalicothere', name: '石爪兽骨骼', nameEn: 'Chalicothere Bone', type: 'animal', eraId: 'miocene', rarity: 'rare', description: '长有爪子的奇蹄动物，用指关节行走。', funFact: '石爪兽与马和犀牛有亲缘关系但外观像大猩猩。', svgPath: simpleBone, width: 50, height: 50 },
  { id: 'saber_tooth_salmon', name: '剑齿鲑鱼化石', nameEn: 'Sabertooth Salmon', type: 'animal', eraId: 'miocene', rarity: 'rare', description: '长有巨大牙齿的巨型鲑鱼，体长可达2米。', funFact: '剑齿鲑鱼可能用牙齿互相搏斗。', svgPath: simpleFish, width: 50, height: 50 },
  { id: 'diatryma', name: '冠恐鸟骨骼', nameEn: 'Diatryma Bone', type: 'animal', eraId: 'eocene', rarity: 'rare', description: '身高2米的不会飞行的巨型鸟类，是早期哺乳动物的天敌。', funFact: '关于冠恐鸟是掠食者还是植食者仍有争议。', svgPath: simpleBone, width: 50, height: 50 },
  { id: 'mesonychid', name: '中兽骨骼', nameEn: 'Mesonychid Bone', type: 'animal', eraId: 'eocene', rarity: 'rare', description: '有蹄的肉食动物，被认为是鲸鱼的近亲。', funFact: '中兽是白垩纪后第一种大型陆生掠食者。', svgPath: simpleBone, width: 50, height: 50 },
  { id: 'crocodile', name: '史前鳄鱼', nameEn: 'Prehistoric Crocodile', type: 'animal', eraId: 'cretaceous', rarity: 'uncommon', description: '与恐龙同时代的鳄鱼祖先，体型巨大。', funFact: '鳄鱼已在地球上生存了2亿多年。', svgPath: 'M10,30 L40,25 L45,30 L40,35 L10,35 Z M10,30 L5,28 M10,35 L5,37', width: 50, height: 50 },
  { id: 'hadrosaur', name: '鸭嘴龙牙齿', nameEn: 'Hadrosaur Tooth', type: 'animal', eraId: 'cretaceous', rarity: 'common', description: '鸭嘴龙的牙齿，这类恐龙有数百颗牙齿用于研磨植物。', funFact: '鸭嘴龙可能是群居动物。', svgPath: 'M20,40 L25,20 L30,40 Z', width: 50, height: 50 },
  { id: 'ankylosaurus', name: '甲龙甲板', nameEn: 'Ankylosaurus Scute', type: 'animal', eraId: 'cretaceous', rarity: 'uncommon', description: '甲龙身上的骨板，如同活体坦克的装甲。', funFact: '甲龙的尾锤可击碎霸王龙的骨头。', svgPath: 'M15,20 Q25,10 35,20 Q38,35 25,40 Q12,35 15,20', width: 50, height: 50 },
  { id: 'plesiosaur', name: '蛇颈龙骨骼', nameEn: 'Plesiosaur Bone', type: 'animal', eraId: 'jurassic', rarity: 'rare', description: '长脖子的海洋爬行动物，是传说中尼斯湖水怪的原型。', funFact: '蛇颈龙的脖子可有70多节颈椎。', svgPath: simpleBone, width: 50, height: 50 },
  { id: 'ichthyosaur', name: '鱼龙化石', nameEn: 'Ichthyosaur', type: 'animal', eraId: 'jurassic', rarity: 'uncommon', description: '外形类似海豚的海洋爬行动物，是侏罗纪海洋的游泳健将。', funFact: '鱼龙是直接产下幼崽的。', svgPath: simpleFish, width: 50, height: 50 },
  { id: 'allosaurus', name: '异特龙骨骼', nameEn: 'Allosaurus Bone', type: 'animal', eraId: 'jurassic', rarity: 'uncommon', description: '侏罗纪最常见的大型掠食恐龙。', funFact: '异特龙可能会合作捕猎大型蜥脚类恐龙。', svgPath: simpleBone, width: 50, height: 50 },
  { id: 'cycad', name: '苏铁化石', nameEn: 'Cycad Fossil', type: 'plant', eraId: 'jurassic', rarity: 'common', description: '恐龙时代最常见的植物之一，外观类似棕榈树。', funFact: '苏铁被称为"活化石"，至今仍有现存种。', svgPath: 'M25,45 L25,25 M15,30 L5,20 M20,25 L8,15 M25,20 L25,5 M30,25 L42,15 M35,30 L45,20', width: 50, height: 50 },
  { id: 'lystrosaurus', name: '水龙兽化石', nameEn: 'Lystrosaurus', type: 'animal', eraId: 'triassic', rarity: 'uncommon', description: '二叠纪大灭绝后幸存的似哺乳爬行动物，曾是地球上最常见的脊椎动物。', funFact: '水龙兽的化石在南极也有发现，证明了大陆漂移。', svgPath: 'M15,25 Q25,15 35,25 Q38,40 25,42 Q12,40 15,25 M18,35 L18,42', width: 50, height: 50 },
  { id: 'placoderm', name: '盾皮鱼化石', nameEn: 'Placoderm', type: 'animal', eraId: 'paleozoic', rarity: 'uncommon', description: '最早的有颌鱼类，头部覆盖着骨质甲板。', funFact: '盾皮鱼是第一种体内受精的脊椎动物。', svgPath: 'M10,25 Q25,10 40,25 Q45,40 35,45 L15,45 Q5,40 10,25', width: 50, height: 50 },
  { id: 'eurypterid', name: '板足鲎化石', nameEn: 'Eurypterid', type: 'animal', eraId: 'paleozoic', rarity: 'rare', description: '又称海蝎子，是古生代最大的节肢动物，体长可达2.5米。', funFact: '板足鲎可能是蛛形纲动物的祖先。', svgPath: 'M10,25 L30,25 L45,15 L45,35 Z M30,25 L35,10 M30,25 L35,40', width: 50, height: 50 },
  { id: 'calamites', name: '芦木化石', nameEn: 'Calamites', type: 'plant', eraId: 'paleozoic', rarity: 'common', description: '石炭纪的巨型木贼类植物，可高达30米。', funFact: '芦木是现代木贼的远亲。', svgPath: 'M25,5 L25,45 M15,15 L35,15 M15,25 L35,25 M15,35 L35,35', width: 50, height: 50 },
  { id: 'signature_rock', name: '笔石化石', nameEn: 'Graptolite', type: 'animal', eraId: 'paleozoic', rarity: 'common', description: '笔石纲动物的化石，形似铅笔在岩石上书写的痕迹。', funFact: '笔石是重要的标准化石，用于确定奥陶纪和志留纪地层。', svgPath: 'M10,20 Q25,30 40,20', width: 50, height: 50 },
  { id: 'quartz_crystal', name: '水晶晶体', nameEn: 'Quartz Crystal', type: 'mineral', eraId: 'precambrian', rarity: 'uncommon', description: '在地壳深处形成的二氧化硅晶体，晶莹剔透。', funFact: '水晶的莫氏硬度为7，可刻划玻璃。', svgPath: simpleCrystal, width: 50, height: 50 },
  { id: 'pyrite', name: '黄铁矿', nameEn: 'Pyrite', type: 'mineral', eraId: 'paleozoic', rarity: 'common', description: '因其金黄色外观也被称为"愚人金"。', funFact: '黄铁矿的化学成分是二硫化亚铁。', svgPath: simpleCrystal, width: 50, height: 50 },
  { id: 'dinosaur_bone', name: '恐龙骨骼碎片', nameEn: 'Dinosaur Bone Fragment', type: 'animal', eraId: 'jurassic', rarity: 'common', description: '恐龙骨骼的碎片化石，是最常见的恐龙化石类型。', funFact: '恐龙骨骼在石化过程中会被矿物质取代。', svgPath: simpleBone, width: 50, height: 50 },
]

export const getFossilsByEra = (eraId: string): Fossil[] => {
  return FOSSILS.filter(f => f.eraId === eraId)
}

export const getFossilById = (id: string): Fossil | undefined => {
  return FOSSILS.find(f => f.id === id)
}

export const getRarityColor = (rarity: string): string => {
  const colors: Record<string, string> = {
    common: '#9CA3AF',
    uncommon: '#10B981',
    rare: '#3B82F6',
    epic: '#8B5CF6',
    legendary: '#F59E0B'
  }
  return colors[rarity] || '#9CA3AF'
}

export const getRarityName = (rarity: string): string => {
  const names: Record<string, string> = {
    common: '普通',
    uncommon: '稀有',
    rare: '珍贵',
    epic: '史诗',
    legendary: '传说'
  }
  return names[rarity] || '普通'
}
