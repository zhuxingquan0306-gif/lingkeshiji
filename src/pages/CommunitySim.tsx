import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  Hourglass,
  Wallet,
  Users,
  TrendingUp,
  Plus,
  ChevronRight,
  Sparkles,
  Target,
  HandCoins,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import gsap from 'gsap';

// 模拟委托数据
interface Delegation {
  id: string;
  title: string;
  description: string;
  type: 'pending' | 'active' | 'completed';
  poolAmount: number;
  creator: {
    name: string;
    avatar: string;
    reputation: number;
  };
  acceptor?: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  deadline: string;
  category: string;
  participants: number;
}

// 100个委托数据
const mockDelegations: Delegation[] = [
  {
    id: '1',
    title: '给校园流浪猫准备过冬场所和食物',
    description: '冬天快到了，学校里有几只流浪猫没有地方避寒，想请大家一起帮忙搭建猫窝，准备一些猫粮和干净的水。',
    type: 'pending',
    poolAmount: 300,
    creator: { name: '爱猫的小林', avatar: '林', reputation: 4.9 },
    createdAt: '2026-02-06',
    deadline: '2026-02-15',
    category: '爱心互助',
    participants: 2,
  },
  {
    id: '2',
    title: '找一个靠谱的暑期兼职工作',
    description: '大二学生，暑假不想回家，想在大城市找一份包住的兼职工作，最好是餐饮或服务行业，能锻炼自己。',
    type: 'pending',
    poolAmount: 200,
    creator: { name: '想独立的阿杰', avatar: '杰', reputation: 4.5 },
    createdAt: '2026-02-06',
    deadline: '2026-06-01',
    category: '求职帮助',
    participants: 1,
  },
  {
    id: '3',
    title: '寻求法律帮助（经济合同纠纷）',
    description: '之前签了一份兼职合同，现在对方拖欠工资不给，金额不大但心里憋屈，想咨询一下懂法律的朋友该怎么办。',
    type: 'pending',
    poolAmount: 500,
    creator: { name: '维权的小张', avatar: '张', reputation: 4.6 },
    createdAt: '2026-02-05',
    deadline: '2026-02-28',
    category: '法律咨询',
    participants: 0,
  },
  {
    id: '4',
    title: '刚毕业被坑，想找个临时住处过渡',
    description: '刚毕业来城里打工，中介骗了押金，现在身上钱不多，想找个能暂住一周的地方，我可以帮忙做家务或跑腿作为回报。',
    type: 'pending',
    poolAmount: 150,
    creator: { name: '迷茫的毕业生', avatar: '毕', reputation: 4.3 },
    createdAt: '2026-02-06',
    deadline: '2026-02-13',
    category: '临时借住',
    participants: 3,
  },
  {
    id: '5',
    title: '帮忙照看宠物一周',
    description: '家里突然有急事需要回老家一周，两只猫咪没人照顾，希望有好心人能帮忙喂养和清理猫砂。',
    type: 'active',
    poolAmount: 400,
    creator: { name: '养猫的阿伟', avatar: '伟', reputation: 4.8 },
    acceptor: { name: '爱猫的阿姨', avatar: '姨' },
    createdAt: '2026-02-04',
    deadline: '2026-02-11',
    category: '宠物互助',
    participants: 1,
  },
  {
    id: '6',
    title: '教老人使用智能手机',
    description: '奶奶刚买了智能手机，想学会用微信和家里人视频，每周两次，每次一小时，有耐心的人来。',
    type: 'active',
    poolAmount: 350,
    creator: { name: '孝顺的小刘', avatar: '刘', reputation: 4.7 },
    acceptor: { name: '热心的志愿者', avatar: '志' },
    createdAt: '2026-02-03',
    deadline: '2026-03-01',
    category: '技能培训',
    participants: 1,
  },
  {
    id: '7',
    title: '帮忙搬家，东西不多',
    description: '从城中村搬到隔壁小区，只有几个箱子和一个书桌，一个人搬不动，希望有人能帮忙。',
    type: 'active',
    poolAmount: 250,
    creator: { name: '搬家的阿强', avatar: '强', reputation: 4.6 },
    acceptor: { name: '有力气的小哥', avatar: '哥' },
    createdAt: '2026-02-05',
    deadline: '2026-02-08',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '8',
    title: '帮高三学生补习数学',
    description: '弟弟高三了，数学成绩一直上不去，想找个有经验的人帮忙补习，主要是函数和几何部分。',
    type: 'pending',
    poolAmount: 600,
    creator: { name: '担心的姐姐', avatar: '姐', reputation: 4.8 },
    createdAt: '2026-02-05',
    deadline: '2026-05-01',
    category: '学习辅导',
    participants: 2,
  },
  {
    id: '9',
    title: '帮忙去医院取报告',
    description: '腿脚不方便，去医院检查后需要三天后取报告，希望有人能帮忙跑一趟，路费我出。',
    type: 'pending',
    poolAmount: 100,
    creator: { name: '行动不便的老人', avatar: '老', reputation: 4.9 },
    createdAt: '2026-02-06',
    deadline: '2026-02-10',
    category: '跑腿代办',
    participants: 1,
  },
  {
    id: '10',
    title: '失业了，求一份短期日结工作',
    description: '公司突然裁员，身上钱快花光了，什么活都能干，搬运、清洁、发传单都可以，有口饭吃就行。',
    type: 'pending',
    poolAmount: 50,
    creator: { name: '失业的阿明', avatar: '明', reputation: 4.4 },
    createdAt: '2026-02-06',
    deadline: '2026-02-10',
    category: '求职帮助',
    participants: 4,
  },
  {
    id: '11',
    title: '帮忙接送孩子放学',
    description: '最近加班太多，没办法按时接孩子放学，希望有人能帮忙接一下，送到小区门卫室就行。',
    type: 'completed',
    poolAmount: 500,
    creator: { name: '忙碌的妈妈', avatar: '妈', reputation: 4.7 },
    acceptor: { name: '热心的邻居', avatar: '邻' },
    createdAt: '2026-01-25',
    deadline: '2026-02-03',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '12',
    title: '教独居老人做简单饭菜',
    description: '爷爷一个人住，只会煮面条，想学会做几道简单的家常菜，营养健康一点的。',
    type: 'completed',
    poolAmount: 300,
    creator: { name: '远方的孙女', avatar: '孙', reputation: 4.8 },
    acceptor: { name: '爱做饭的大姐', avatar: '厨' },
    createdAt: '2026-01-20',
    deadline: '2026-02-01',
    category: '技能培训',
    participants: 1,
  },
  {
    id: '13',
    title: '帮忙照顾生病的室友',
    description: '室友感冒发烧了，需要有人帮忙买药、带饭，照顾两三天。',
    type: 'pending',
    poolAmount: 80,
    creator: { name: '小王', avatar: '小', reputation: 4.3 },
    createdAt: '2026-02-01',
    deadline: '2026-02-17',
    category: '爱心互助',
    participants: 3,
  },
  {
    id: '14',
    title: '求借一辆自行车一周',
    description: '下周要去郊区调研，想借一辆自行车，会好好爱护的。',
    type: 'pending',
    poolAmount: 400,
    creator: { name: '小李', avatar: '小', reputation: 4.2 },
    createdAt: '2026-02-05',
    deadline: '2026-02-20',
    category: '爱心互助',
    participants: 0,
  },
  {
    id: '15',
    title: '帮忙写一份简历',
    description: '应届毕业生，不太会写简历，希望有人能帮忙修改一下。',
    type: 'pending',
    poolAmount: 300,
    creator: { name: '小张', avatar: '小', reputation: 4.1 },
    createdAt: '2026-02-06',
    deadline: '2026-02-19',
    category: '技能培训',
    participants: 3,
  },
  {
    id: '16',
    title: '求推荐靠谱的租房信息',
    description: '刚来这个城市，不熟悉环境，想找个靠谱的房子租。',
    type: 'pending',
    poolAmount: 200,
    creator: { name: '小刘', avatar: '小', reputation: 4.9 },
    createdAt: '2026-02-05',
    deadline: '2026-02-18',
    category: '生活服务',
    participants: 2,
  },
  {
    id: '17',
    title: '帮忙照看家里植物',
    description: '要出差两周，家里的植物没人浇水，希望有人能帮忙照顾。',
    type: 'pending',
    poolAmount: 150,
    creator: { name: '小陈', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-01',
    deadline: '2026-02-21',
    category: '宠物互助',
    participants: 1,
  },
  {
    id: '18',
    title: '求借一个行李箱',
    description: '下周要回老家，东西太多装不下，想借一个行李箱。',
    type: 'pending',
    poolAmount: 100,
    creator: { name: '小杨', avatar: '小', reputation: 4.7 },
    createdAt: '2026-02-06',
    deadline: '2026-02-16',
    category: '爱心互助',
    participants: 0,
  },
  {
    id: '19',
    title: '帮忙修电脑',
    description: '电脑突然开不了机了，里面有重要资料，求懂电脑的朋友帮忙看看。',
    type: 'pending',
    poolAmount: 250,
    creator: { name: '小黄', avatar: '小', reputation: 4.4 },
    createdAt: '2026-02-05',
    deadline: '2026-02-14',
    category: '技能培训',
    participants: 2,
  },
  {
    id: '20',
    title: '求推荐附近好吃又便宜的餐馆',
    description: '刚到这个城市，不知道哪里有好吃的，求本地人推荐。',
    type: 'pending',
    poolAmount: 50,
    creator: { name: '小赵', avatar: '小', reputation: 4.8 },
    createdAt: '2026-02-02',
    deadline: '2026-02-13',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '21',
    title: '帮忙带一份外卖',
    description: '加班太晚没力气做饭了，希望有人能帮忙带份外卖到小区门口。',
    type: 'pending',
    poolAmount: 80,
    creator: { name: '小吴', avatar: '小', reputation: 4.6 },
    createdAt: '2026-02-06',
    deadline: '2026-02-12',
    category: '跑腿代办',
    participants: 0,
  },
  {
    id: '22',
    title: '求借一本考研资料',
    description: '准备考研，想借一本复习资料，看完就还。',
    type: 'pending',
    poolAmount: 120,
    creator: { name: '小周', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-03',
    deadline: '2026-02-22',
    category: '学习辅导',
    participants: 1,
  },
  {
    id: '23',
    title: '帮忙照顾住院的奶奶',
    description: '奶奶住院了，家里人有事走不开，需要有人帮忙陪护几天。',
    type: 'active',
    poolAmount: 500,
    creator: { name: '小徐', avatar: '小', reputation: 4.9 },
    acceptor: { name: '热心的阿姨', avatar: '热' },
    createdAt: '2026-02-04',
    deadline: '2026-02-18',
    category: '爱心互助',
    participants: 1,
  },
  {
    id: '24',
    title: '求一份家教兼职',
    description: '想找一份家教工作，教小学或初中都可以，有经验。',
    type: 'pending',
    poolAmount: 180,
    creator: { name: '小孙', avatar: '小', reputation: 4.7 },
    createdAt: '2026-02-01',
    deadline: '2026-03-01',
    category: '求职帮助',
    participants: 2,
  },
  {
    id: '25',
    title: '帮忙组装家具',
    description: '买了新家具但不会组装，求动手能力强的朋友帮忙。',
    type: 'pending',
    poolAmount: 200,
    creator: { name: '小马', avatar: '小', reputation: 4.3 },
    createdAt: '2026-02-05',
    deadline: '2026-02-15',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '26',
    title: '求推荐靠谱的驾校',
    description: '想考驾照但不知道哪个驾校靠谱，求推荐。',
    type: 'pending',
    poolAmount: 100,
    creator: { name: '小朱', avatar: '小', reputation: 4.6 },
    createdAt: '2026-02-02',
    deadline: '2026-02-25',
    category: '技能培训',
    participants: 0,
  },
  {
    id: '27',
    title: '帮忙照顾刚做完手术的妈妈',
    description: '妈妈刚做完手术需要人照顾，我白天要上班，求帮忙。',
    type: 'completed',
    poolAmount: 450,
    creator: { name: '小胡', avatar: '小', reputation: 4.8 },
    acceptor: { name: '好心的大哥', avatar: '好' },
    createdAt: '2026-01-28',
    deadline: '2026-02-05',
    category: '爱心互助',
    participants: 1,
  },
  {
    id: '28',
    title: '求借一个帐篷去露营',
    description: '周末想去露营，想借一个帐篷，只用两天。',
    type: 'pending',
    poolAmount: 150,
    creator: { name: '小郭', avatar: '小', reputation: 4.4 },
    createdAt: '2026-02-06',
    deadline: '2026-02-17',
    category: '爱心互助',
    participants: 0,
  },
  {
    id: '29',
    title: '帮忙写一份辞职信',
    description: '想辞职但不知道怎么写辞职信，求文笔好的朋友帮忙。',
    type: 'pending',
    poolAmount: 120,
    creator: { name: '小林', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-03',
    deadline: '2026-02-14',
    category: '技能培训',
    participants: 1,
  },
  {
    id: '30',
    title: '求推荐适合新手的健身房',
    description: '想健身但不知道从哪里开始，求推荐适合新手的健身房。',
    type: 'pending',
    poolAmount: 80,
    creator: { name: '小何', avatar: '小', reputation: 4.7 },
    createdAt: '2026-02-01',
    deadline: '2026-02-23',
    category: '生活服务',
    participants: 2,
  },
  {
    id: '31',
    title: '帮忙照顾家里的狗',
    description: '要出国一个月，家里的狗没人照顾，求爱狗人士帮忙。',
    type: 'active',
    poolAmount: 600,
    creator: { name: '小高', avatar: '小', reputation: 4.9 },
    acceptor: { name: '善良的姐姐', avatar: '善' },
    createdAt: '2026-02-04',
    deadline: '2026-03-04',
    category: '宠物互助',
    participants: 1,
  },
  {
    id: '32',
    title: '求一份周末兼职',
    description: '想找一份周末兼职，什么工作都可以，能吃苦。',
    type: 'pending',
    poolAmount: 100,
    creator: { name: '小罗', avatar: '小', reputation: 4.3 },
    createdAt: '2026-02-05',
    deadline: '2026-02-28',
    category: '求职帮助',
    participants: 3,
  },
  {
    id: '33',
    title: '帮忙修理漏水的水龙头',
    description: '水龙头一直滴水，不会修，求懂水电的朋友帮忙看看。',
    type: 'completed',
    poolAmount: 150,
    creator: { name: '小郑', avatar: '小', reputation: 4.6 },
    acceptor: { name: '乐于助人的小哥', avatar: '乐' },
    createdAt: '2026-01-25',
    deadline: '2026-02-02',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '34',
    title: '求推荐靠谱的心理咨询师',
    description: '最近压力很大，想找个心理咨询师聊聊，求推荐靠谱的。',
    type: 'pending',
    poolAmount: 200,
    creator: { name: '小梁', avatar: '小', reputation: 4.8 },
    createdAt: '2026-02-06',
    deadline: '2026-02-24',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '35',
    title: '帮忙照顾刚出生的宝宝',
    description: '刚生了宝宝，需要有人帮忙照顾月子，有经验的人来。',
    type: 'pending',
    poolAmount: 800,
    creator: { name: '小谢', avatar: '小', reputation: 4.7 },
    createdAt: '2026-02-05',
    deadline: '2026-03-05',
    category: '爱心互助',
    participants: 2,
  },
  {
    id: '36',
    title: '求借一个相机去旅行',
    description: '下周要去旅行，想借一个相机记录美好瞬间。',
    type: 'pending',
    poolAmount: 300,
    creator: { name: '小宋', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-06',
    deadline: '2026-02-19',
    category: '爱心互助',
    participants: 0,
  },
  {
    id: '37',
    title: '帮忙写一份入党申请书',
    description: '想入党但不知道怎么写申请书，求有经验的朋友指导。',
    type: 'completed',
    poolAmount: 180,
    creator: { name: '小唐', avatar: '小', reputation: 4.4 },
    acceptor: { name: '爱帮忙的朋友', avatar: '爱' },
    createdAt: '2026-01-22',
    deadline: '2026-02-01',
    category: '技能培训',
    participants: 1,
  },
  {
    id: '38',
    title: '求推荐适合学生党的护肤品',
    description: '预算有限，想买点护肤品，求推荐性价比高的。',
    type: 'pending',
    poolAmount: 60,
    creator: { name: '小许', avatar: '小', reputation: 4.6 },
    createdAt: '2026-02-03',
    deadline: '2026-02-13',
    category: '生活服务',
    participants: 2,
  },
  {
    id: '39',
    title: '帮忙照顾住院的爷爷',
    description: '爷爷住院了，需要有人帮忙送饭、陪护。',
    type: 'active',
    poolAmount: 400,
    creator: { name: '小韩', avatar: '小', reputation: 4.8 },
    acceptor: { name: '热心的志愿者', avatar: '热' },
    createdAt: '2026-02-05',
    deadline: '2026-02-20',
    category: '爱心互助',
    participants: 1,
  },
  {
    id: '40',
    title: '求一份远程实习',
    description: '想找一份可以远程做的实习，专业不限。',
    type: 'pending',
    poolAmount: 250,
    creator: { name: '小冯', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-01',
    deadline: '2026-03-01',
    category: '求职帮助',
    participants: 1,
  },
  {
    id: '41',
    title: '帮忙修理坏掉的门锁',
    description: '门锁坏了打不开，求会修锁的朋友帮忙。',
    type: 'active',
    poolAmount: 200,
    creator: { name: '小邓', avatar: '小', reputation: 4.7 },
    acceptor: { name: '专业师傅', avatar: '专' },
    createdAt: '2026-02-04',
    deadline: '2026-02-09',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '42',
    title: '求推荐靠谱的搬家公司',
    description: '要搬家了，求推荐靠谱的搬家公司。',
    type: 'pending',
    poolAmount: 100,
    creator: { name: '小曹', avatar: '小', reputation: 4.6 },
    createdAt: '2026-02-05',
    deadline: '2026-02-26',
    category: '生活服务',
    participants: 0,
  },
  {
    id: '43',
    title: '帮忙照顾家里的兔子',
    description: '要出差一周，家里的兔子没人喂，求帮忙。',
    type: 'pending',
    poolAmount: 180,
    creator: { name: '小彭', avatar: '小', reputation: 4.4 },
    createdAt: '2026-02-06',
    deadline: '2026-02-16',
    category: '宠物互助',
    participants: 1,
  },
  {
    id: '44',
    title: '求借一个电暖器',
    description: '冬天太冷了，想借一个电暖器用一段时间。',
    type: 'pending',
    poolAmount: 120,
    creator: { name: '小曾', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-02',
    deadline: '2026-02-21',
    category: '爱心互助',
    participants: 0,
  },
  {
    id: '45',
    title: '帮忙写一份工作总结',
    description: '年底要写工作总结，不知道怎么写，求帮忙。',
    type: 'pending',
    poolAmount: 150,
    creator: { name: '小肖', avatar: '小', reputation: 4.3 },
    createdAt: '2026-02-05',
    deadline: '2026-02-15',
    category: '技能培训',
    participants: 1,
  },
  {
    id: '46',
    title: '求推荐附近便宜的打印店',
    description: '要打印很多资料，求推荐附近便宜的打印店。',
    type: 'pending',
    poolAmount: 50,
    creator: { name: '小田', avatar: '小', reputation: 4.7 },
    createdAt: '2026-02-03',
    deadline: '2026-02-12',
    category: '生活服务',
    participants: 2,
  },
  {
    id: '47',
    title: '帮忙照顾住院的爸爸',
    description: '爸爸住院了，需要有人帮忙陪护。',
    type: 'active',
    poolAmount: 500,
    creator: { name: '小董', avatar: '小', reputation: 4.9 },
    acceptor: { name: '靠谱的大叔', avatar: '靠' },
    createdAt: '2026-02-04',
    deadline: '2026-02-22',
    category: '爱心互助',
    participants: 1,
  },
  {
    id: '48',
    title: '求一份暑期实习',
    description: '暑假想找一份实习，积累工作经验。',
    type: 'pending',
    poolAmount: 200,
    creator: { name: '小袁', avatar: '小', reputation: 4.4 },
    createdAt: '2026-02-01',
    deadline: '2026-06-15',
    category: '求职帮助',
    participants: 2,
  },
  {
    id: '49',
    title: '帮忙修理坏掉的电风扇',
    description: '电风扇不转了，求懂电器维修的朋友帮忙看看。',
    type: 'active',
    poolAmount: 120,
    creator: { name: '小潘', avatar: '小', reputation: 4.6 },
    acceptor: { name: '热心的阿姨', avatar: '热' },
    createdAt: '2026-02-05',
    deadline: '2026-02-10',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '50',
    title: '求推荐靠谱的宠物医院',
    description: '家里的狗生病了，求推荐靠谱的宠物医院。',
    type: 'pending',
    poolAmount: 100,
    creator: { name: '小余', avatar: '小', reputation: 4.8 },
    createdAt: '2026-02-06',
    deadline: '2026-02-18',
    category: '宠物互助',
    participants: 1,
  },
  {
    id: '51',
    title: '帮忙照顾家里的仓鼠',
    description: '要出差几天，家里的仓鼠没人照顾，求帮忙。',
    type: 'pending',
    poolAmount: 80,
    creator: { name: '小苏', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-05',
    deadline: '2026-02-14',
    category: '宠物互助',
    participants: 0,
  },
  {
    id: '52',
    title: '求借一个微波炉',
    description: '想自己做饭，想借一个微波炉用一段时间。',
    type: 'pending',
    poolAmount: 100,
    creator: { name: '小魏', avatar: '小', reputation: 4.4 },
    createdAt: '2026-02-02',
    deadline: '2026-02-22',
    category: '爱心互助',
    participants: 0,
  },
  {
    id: '53',
    title: '帮忙写一份实习报告',
    description: '实习结束了要写实习报告，不知道怎么写，求指导。',
    type: 'pending',
    poolAmount: 180,
    creator: { name: '小叶', avatar: '小', reputation: 4.3 },
    createdAt: '2026-02-05',
    deadline: '2026-02-17',
    category: '技能培训',
    participants: 1,
  },
  {
    id: '54',
    title: '求推荐适合初学者的瑜伽馆',
    description: '想练瑜伽，求推荐适合初学者的瑜伽馆。',
    type: 'pending',
    poolAmount: 80,
    creator: { name: '小吕', avatar: '小', reputation: 4.7 },
    createdAt: '2026-02-01',
    deadline: '2026-02-25',
    category: '生活服务',
    participants: 2,
  },
  {
    id: '55',
    title: '帮忙照顾住院的姐姐',
    description: '姐姐住院了，需要有人帮忙陪护。',
    type: 'active',
    poolAmount: 450,
    creator: { name: '小丁', avatar: '小', reputation: 4.8 },
    acceptor: { name: '好心的大哥', avatar: '好' },
    createdAt: '2026-02-04',
    deadline: '2026-02-19',
    category: '爱心互助',
    participants: 1,
  },
  {
    id: '56',
    title: '求一份周末家教',
    description: '周末想找一份家教工作，教小学生。',
    type: 'pending',
    poolAmount: 250,
    creator: { name: '小任', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-03',
    deadline: '2026-03-01',
    category: '求职帮助',
    participants: 1,
  },
  {
    id: '57',
    title: '帮忙安装灯具',
    description: '买了新灯具不会安装，求懂电路的朋友帮忙。',
    type: 'active',
    poolAmount: 150,
    creator: { name: '小卢', avatar: '小', reputation: 4.6 },
    acceptor: { name: '专业师傅', avatar: '专' },
    createdAt: '2026-02-05',
    deadline: '2026-02-11',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '58',
    title: '求推荐靠谱的会计师事务所',
    description: '公司财务有问题，求推荐靠谱的会计师事务所。',
    type: 'pending',
    poolAmount: 200,
    creator: { name: '小沈', avatar: '小', reputation: 4.7 },
    createdAt: '2026-02-06',
    deadline: '2026-02-27',
    category: '生活服务',
    participants: 0,
  },
  {
    id: '59',
    title: '帮忙照顾家里的刺猬',
    description: '要出差一周，家里的刺猬没人照顾，求帮忙。',
    type: 'pending',
    poolAmount: 120,
    creator: { name: '小钟', avatar: '小', reputation: 4.4 },
    createdAt: '2026-02-05',
    deadline: '2026-02-15',
    category: '宠物互助',
    participants: 0,
  },
  {
    id: '60',
    title: '求借一个吸尘器',
    description: '想打扫房间，想借一个吸尘器用一下。',
    type: 'pending',
    poolAmount: 80,
    creator: { name: '小姜', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-02',
    deadline: '2026-02-20',
    category: '爱心互助',
    participants: 1,
  },
  {
    id: '61',
    title: '帮忙写一份市场调研报告',
    description: '要写一份市场调研报告，不知道怎么写，求帮忙。',
    type: 'pending',
    poolAmount: 300,
    creator: { name: '小崔', avatar: '小', reputation: 4.3 },
    createdAt: '2026-02-05',
    deadline: '2026-02-24',
    category: '技能培训',
    participants: 1,
  },
  {
    id: '62',
    title: '求推荐适合儿童的兴趣班',
    description: '想给孩子报兴趣班，求推荐适合儿童的。',
    type: 'pending',
    poolAmount: 100,
    creator: { name: '小谭', avatar: '小', reputation: 4.8 },
    createdAt: '2026-02-01',
    deadline: '2026-02-28',
    category: '生活服务',
    participants: 2,
  },
  {
    id: '63',
    title: '帮忙照顾住院的哥哥',
    description: '哥哥住院了，需要有人帮忙陪护。',
    type: 'active',
    poolAmount: 480,
    creator: { name: '小陆', avatar: '小', reputation: 4.9 },
    acceptor: { name: '善良的姐姐', avatar: '善' },
    createdAt: '2026-02-04',
    deadline: '2026-02-21',
    category: '爱心互助',
    participants: 1,
  },
  {
    id: '64',
    title: '求一份发传单兼职',
    description: '想找一份发传单的兼职，日结最好。',
    type: 'pending',
    poolAmount: 60,
    creator: { name: '小汪', avatar: '小', reputation: 4.4 },
    createdAt: '2026-02-06',
    deadline: '2026-02-13',
    category: '求职帮助',
    participants: 3,
  },
  {
    id: '65',
    title: '帮忙修理坏掉的洗衣机',
    description: '洗衣机不转了，求懂维修的朋友帮忙看看。',
    type: 'active',
    poolAmount: 200,
    creator: { name: '小范', avatar: '小', reputation: 4.7 },
    acceptor: { name: '乐于助人的小哥', avatar: '乐' },
    createdAt: '2026-02-05',
    deadline: '2026-02-12',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '66',
    title: '求推荐靠谱的翻译公司',
    description: '有文件需要翻译，求推荐靠谱的翻译公司。',
    type: 'pending',
    poolAmount: 150,
    creator: { name: '小廖', avatar: '小', reputation: 4.6 },
    createdAt: '2026-02-03',
    deadline: '2026-02-23',
    category: '生活服务',
    participants: 0,
  },
  {
    id: '67',
    title: '帮忙照顾家里的龙猫',
    description: '要出差两周，家里的龙猫没人照顾，求帮忙。',
    type: 'pending',
    poolAmount: 200,
    creator: { name: '小石', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-05',
    deadline: '2026-02-26',
    category: '宠物互助',
    participants: 1,
  },
  {
    id: '68',
    title: '求借一个烤箱',
    description: '想自己做蛋糕，想借一个烤箱用一下。',
    type: 'pending',
    poolAmount: 120,
    creator: { name: '小金', avatar: '小', reputation: 4.4 },
    createdAt: '2026-02-02',
    deadline: '2026-02-19',
    category: '爱心互助',
    participants: 0,
  },
  {
    id: '69',
    title: '帮忙写一份商业计划书',
    description: '创业需要写商业计划书，求有经验的朋友指导。',
    type: 'pending',
    poolAmount: 400,
    creator: { name: '小韦', avatar: '小', reputation: 4.3 },
    createdAt: '2026-02-05',
    deadline: '2026-03-01',
    category: '技能培训',
    participants: 1,
  },
  {
    id: '70',
    title: '求推荐附近便宜的水果摊',
    description: '想买便宜又好吃的水果，求推荐附近的水果摊。',
    type: 'pending',
    poolAmount: 50,
    creator: { name: '小贾', avatar: '小', reputation: 4.7 },
    createdAt: '2026-02-01',
    deadline: '2026-02-14',
    category: '生活服务',
    participants: 2,
  },
  {
    id: '71',
    title: '帮忙照顾刚做完手术的阿姨',
    description: '阿姨刚做完手术需要人照顾，求帮忙。',
    type: 'active',
    poolAmount: 500,
    creator: { name: '小夏', avatar: '小', reputation: 4.8 },
    acceptor: { name: '热心的志愿者', avatar: '热' },
    createdAt: '2026-02-04',
    deadline: '2026-02-25',
    category: '爱心互助',
    participants: 1,
  },
  {
    id: '72',
    title: '求一份餐厅服务员兼职',
    description: '想找一份餐厅服务员的兼职。',
    type: 'pending',
    poolAmount: 80,
    creator: { name: '小付', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-06',
    deadline: '2026-02-28',
    category: '求职帮助',
    participants: 2,
  },
  {
    id: '73',
    title: '帮忙安装书架',
    description: '买了新书架不会安装，求动手能力强的朋友帮忙。',
    type: 'active',
    poolAmount: 150,
    creator: { name: '小方', avatar: '小', reputation: 4.6 },
    acceptor: { name: '靠谱的大叔', avatar: '靠' },
    createdAt: '2026-02-05',
    deadline: '2026-02-10',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '74',
    title: '求推荐靠谱的家政公司',
    description: '家里需要大扫除，求推荐靠谱的家政公司。',
    type: 'pending',
    poolAmount: 100,
    creator: { name: '小白', avatar: '小', reputation: 4.7 },
    createdAt: '2026-02-03',
    deadline: '2026-02-22',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '75',
    title: '帮忙照顾家里的松鼠',
    description: '要出差几天，家里的松鼠没人照顾，求帮忙。',
    type: 'pending',
    poolAmount: 150,
    creator: { name: '小邹', avatar: '小', reputation: 4.4 },
    createdAt: '2026-02-05',
    deadline: '2026-02-18',
    category: '宠物互助',
    participants: 0,
  },
  {
    id: '76',
    title: '求借一个榨汁机',
    description: '想自己做果汁，想借一个榨汁机用一下。',
    type: 'pending',
    poolAmount: 80,
    creator: { name: '小孟', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-02',
    deadline: '2026-02-21',
    category: '爱心互助',
    participants: 1,
  },
  {
    id: '77',
    title: '帮忙写一份年度总结',
    description: '年底要写年度总结，不知道怎么写，求帮忙。',
    type: 'pending',
    poolAmount: 200,
    creator: { name: '小熊', avatar: '小', reputation: 4.3 },
    createdAt: '2026-02-05',
    deadline: '2026-02-27',
    category: '技能培训',
    participants: 1,
  },
  {
    id: '78',
    title: '求推荐适合孕妇的瑜伽班',
    description: '怀孕了想练瑜伽，求推荐适合孕妇的瑜伽班。',
    type: 'pending',
    poolAmount: 120,
    creator: { name: '小秦', avatar: '小', reputation: 4.8 },
    createdAt: '2026-02-01',
    deadline: '2026-02-29',
    category: '生活服务',
    participants: 2,
  },
  {
    id: '79',
    title: '帮忙照顾住院的舅舅',
    description: '舅舅住院了，需要有人帮忙陪护。',
    type: 'active',
    poolAmount: 520,
    creator: { name: '小邱', avatar: '小', reputation: 4.9 },
    acceptor: { name: '爱帮忙的朋友', avatar: '爱' },
    createdAt: '2026-02-04',
    deadline: '2026-02-23',
    category: '爱心互助',
    participants: 1,
  },
  {
    id: '80',
    title: '求一份快递分拣兼职',
    description: '想找一份快递分拣的兼职，能吃苦。',
    type: 'pending',
    poolAmount: 70,
    creator: { name: '小江', avatar: '小', reputation: 4.4 },
    createdAt: '2026-02-06',
    deadline: '2026-02-16',
    category: '求职帮助',
    participants: 3,
  },
  {
    id: '81',
    title: '帮忙修理坏掉的电视机',
    description: '电视机没画面了，求懂维修的朋友帮忙看看。',
    type: 'active',
    poolAmount: 250,
    creator: { name: '小尹', avatar: '小', reputation: 4.7 },
    acceptor: { name: '专业师傅', avatar: '专' },
    createdAt: '2026-02-05',
    deadline: '2026-02-14',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '82',
    title: '求推荐靠谱的旅行社',
    description: '想带家人去旅游，求推荐靠谱的旅行社。',
    type: 'pending',
    poolAmount: 150,
    creator: { name: '小薛', avatar: '小', reputation: 4.6 },
    createdAt: '2026-02-03',
    deadline: '2026-02-24',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '83',
    title: '帮忙照顾家里的蜥蜴',
    description: '要出差一周，家里的蜥蜴没人照顾，求帮忙。',
    type: 'pending',
    poolAmount: 180,
    creator: { name: '小闫', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-05',
    deadline: '2026-02-20',
    category: '宠物互助',
    participants: 0,
  },
  {
    id: '84',
    title: '求借一个蓝牙音箱',
    description: '周末想开派对，想借一个蓝牙音箱用一下。',
    type: 'pending',
    poolAmount: 100,
    creator: { name: '小段', avatar: '小', reputation: 4.4 },
    createdAt: '2026-02-02',
    deadline: '2026-02-17',
    category: '爱心互助',
    participants: 0,
  },
  {
    id: '85',
    title: '帮忙写一份推荐信',
    description: '要申请研究生，需要一封推荐信，求老师帮忙写。',
    type: 'pending',
    poolAmount: 300,
    creator: { name: '小雷', avatar: '小', reputation: 4.3 },
    createdAt: '2026-02-05',
    deadline: '2026-03-01',
    category: '技能培训',
    participants: 1,
  },
  {
    id: '86',
    title: '帮忙照顾家里的植物',
    description: '要出差两周，家里的植物没人浇水，求帮忙。',
    type: 'pending',
    poolAmount: 100,
    creator: { name: '小侯', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-05',
    deadline: '2026-02-25',
    category: '宠物互助',
    participants: 1,
  },
  {
    id: '87',
    title: '求一份图书馆兼职',
    description: '想找一份图书馆的兼职，喜欢看书，时间灵活最好。',
    type: 'pending',
    poolAmount: 120,
    creator: { name: '小龙', avatar: '小', reputation: 4.6 },
    createdAt: '2026-02-06',
    deadline: '2026-02-28',
    category: '求职帮助',
    participants: 1,
  },
  {
    id: '88',
    title: '帮忙安装路由器',
    description: '买了新路由器不会设置，求懂网络的朋友帮忙。',
    type: 'active',
    poolAmount: 100,
    creator: { name: '小史', avatar: '小', reputation: 4.7 },
    acceptor: { name: '热心的阿姨', avatar: '热' },
    createdAt: '2026-02-05',
    deadline: '2026-02-11',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '89',
    title: '求借一个滑板',
    description: '想学滑板，想借一个试试，看适不适合自己。',
    type: 'pending',
    poolAmount: 80,
    creator: { name: '小陶', avatar: '小', reputation: 4.4 },
    createdAt: '2026-02-02',
    deadline: '2026-02-19',
    category: '爱心互助',
    participants: 0,
  },
  {
    id: '90',
    title: '帮忙照顾住院的舅妈',
    description: '舅妈住院了，需要有人帮忙送饭、陪护。',
    type: 'active',
    poolAmount: 480,
    creator: { name: '小黎', avatar: '小', reputation: 4.8 },
    acceptor: { name: '善良的姐姐', avatar: '善' },
    createdAt: '2026-02-04',
    deadline: '2026-02-26',
    category: '爱心互助',
    participants: 1,
  },
  {
    id: '91',
    title: '帮忙照顾刚做完手术的邻居',
    description: '邻居阿姨刚做完手术，子女都在外地，需要有人帮忙照顾几天。',
    type: 'pending',
    poolAmount: 400,
    creator: { name: '小贺', avatar: '小', reputation: 4.9 },
    createdAt: '2026-02-06',
    deadline: '2026-02-22',
    category: '爱心互助',
    participants: 2,
  },
  {
    id: '92',
    title: '求推荐靠谱的月嫂',
    description: '老婆快生了，想找个靠谱的月嫂，求有经验的人推荐。',
    type: 'pending',
    poolAmount: 200,
    creator: { name: '小顾', avatar: '小', reputation: 4.7 },
    createdAt: '2026-02-05',
    deadline: '2026-03-01',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '93',
    title: '帮忙修理坏掉的电脑',
    description: '电脑突然蓝屏了，里面有重要资料，求懂电脑的朋友帮忙。',
    type: 'active',
    poolAmount: 250,
    creator: { name: '小毛', avatar: '小', reputation: 4.6 },
    acceptor: { name: '乐于助人的小哥', avatar: '乐' },
    createdAt: '2026-02-05',
    deadline: '2026-02-13',
    category: '生活服务',
    participants: 1,
  },
  {
    id: '94',
    title: '教小朋友弹钢琴',
    description: '女儿想学钢琴，想找个有耐心的人教她入门。',
    type: 'active',
    poolAmount: 500,
    creator: { name: '小郝', avatar: '小', reputation: 4.8 },
    acceptor: { name: '有经验的老师', avatar: '有' },
    createdAt: '2026-02-04',
    deadline: '2026-03-15',
    category: '学习辅导',
    participants: 1,
  },
  {
    id: '95',
    title: '求借一个电饭煲',
    description: '想自己做饭，想借一个电饭煲用一段时间。',
    type: 'pending',
    poolAmount: 120,
    creator: { name: '小龚', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-06',
    deadline: '2026-02-23',
    category: '爱心互助',
    participants: 0,
  },
  {
    id: '96',
    title: '帮忙写一份活动策划',
    description: '要组织一个活动，需要写活动策划，求帮忙。',
    type: 'pending',
    poolAmount: 280,
    creator: { name: '小邵', avatar: '小', reputation: 4.4 },
    createdAt: '2026-02-05',
    deadline: '2026-02-27',
    category: '技能培训',
    participants: 1,
  },
  {
    id: '97',
    title: '求推荐适合老年人的体检中心',
    description: '想带父母去体检，求推荐适合老年人的体检中心。',
    type: 'pending',
    poolAmount: 100,
    creator: { name: '小万', avatar: '小', reputation: 4.7 },
    createdAt: '2026-02-03',
    deadline: '2026-02-25',
    category: '生活服务',
    participants: 2,
  },
  {
    id: '98',
    title: '帮忙照顾住院的外婆',
    description: '外婆住院了，需要有人帮忙送饭、陪护。',
    type: 'completed',
    poolAmount: 450,
    creator: { name: '小钱', avatar: '小', reputation: 4.9 },
    acceptor: { name: '热心的邻居', avatar: '热' },
    createdAt: '2026-01-26',
    deadline: '2026-02-04',
    category: '爱心互助',
    participants: 1,
  },
  {
    id: '99',
    title: '求一份线上兼职',
    description: '想找一份可以在网上做的兼职。',
    type: 'pending',
    poolAmount: 100,
    creator: { name: '小严', avatar: '小', reputation: 4.5 },
    createdAt: '2026-02-06',
    deadline: '2026-02-28',
    category: '求职帮助',
    participants: 2,
  },
  {
    id: '100',
    title: '帮忙修理坏掉的冰箱',
    description: '冰箱不制冷了，求懂维修的朋友帮忙看看。',
    type: 'completed',
    poolAmount: 300,
    creator: { name: '小覃', avatar: '小', reputation: 4.7 },
    acceptor: { name: '专业师傅', avatar: '专' },
    createdAt: '2026-01-24',
    deadline: '2026-02-03',
    category: '生活服务',
    participants: 1,
  },
];

// 统计数据
const stats = {
  totalDelegations: 100,
  activeDelegations: 25,
  completedDelegations: 26,
  totalPoolValue: 38520,
  communityMembers: 312,
};

const CommunitySim = () => {
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [filteredDelegations, setFilteredDelegations] = useState(mockDelegations);

  const categories = ['全部', '爱心互助', '求职帮助', '法律咨询', '临时借住', '宠物互助', '生活服务', '技能培训', '学习辅导', '跑腿代办'];

  useEffect(() => {
    // 入场动画
    const tl = gsap.timeline();
    tl.fromTo(
      headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
    tl.fromTo(
      contentRef.current?.children || [],
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
      '-=0.3'
    );
  }, []);

  useEffect(() => {
    // 筛选委托
    let filtered = mockDelegations;
    
    if (searchQuery) {
      filtered = filtered.filter(
        (d) =>
          d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== '全部') {
      filtered = filtered.filter((d) => d.category === selectedCategory);
    }
    
    setFilteredDelegations(filtered);
  }, [searchQuery, selectedCategory]);

  const getStatusBadge = (type: string) => {
    switch (type) {
      case 'pending':
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Hourglass className="w-3 h-3 mr-1" />
            等待接受
          </Badge>
        );
      case 'active':
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <Clock className="w-3 h-3 mr-1" />
            进行中
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            已完成
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTypeCount = (type: string) => {
    return mockDelegations.filter((d) => d.type === type).length;
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#e9e4df]">
      {/* Header */}
      <div ref={headerRef} className="sticky top-0 z-50 glass border-b border-[#c9a87c]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button & Logo */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="text-[#e9e4df]/60 hover:text-[#c9a87c] hover:bg-[#c9a87c]/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c9a87c] flex items-center justify-center">
                  <span className="text-[#1a1a1a] font-medium">灵</span>
                </div>
                <div>
                  <h1 className="text-lg font-medium text-[#e9e4df]">灵可社区</h1>
                  <p className="text-xs text-[#e9e4df]/50">委托互助平台</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e9e4df]/40" />
                <Input
                  placeholder="搜索委托..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#1a1a1a] border-[#c9a87c]/20 text-[#e9e4df] placeholder:text-[#e9e4df]/40 focus:border-[#c9a87c]/50"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="hidden sm:flex border-[#c9a87c]/30 text-[#c9a87c] hover:bg-[#c9a87c]/10"
              >
                <Wallet className="w-4 h-4 mr-2" />
                2,580 LKB
              </Button>
              <Button className="bg-[#c9a87c] hover:bg-[#d4b88d] text-[#1a1a1a]">
                <Plus className="w-4 h-4 mr-2" />
                发起委托
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: '总委托数', value: stats.totalDelegations, icon: Target, color: '#c9a87c' },
            { label: '进行中', value: stats.activeDelegations, icon: Clock, color: '#10b981' },
            { label: '币池总量', value: `${stats.totalPoolValue.toLocaleString()} LKB`, icon: HandCoins, color: '#f59e0b' },
            { label: '社区成员', value: stats.communityMembers, icon: Users, color: '#3b82f6' },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-[#1a1a1a] border border-[#c9a87c]/10 hover:border-[#c9a87c]/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <span className="text-xs text-[#e9e4df]/50">{stat.label}</span>
              </div>
              <div className="text-2xl font-light" style={{ color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-[#e9e4df]/40 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#c9a87c] text-[#1a1a1a]'
                  : 'bg-[#1a1a1a] text-[#e9e4df]/60 border border-[#c9a87c]/20 hover:border-[#c9a87c]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Delegations Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="bg-[#1a1a1a] border border-[#c9a87c]/20 mb-6">
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-[#c9a87c] data-[state=active]:text-[#1a1a1a]"
            >
              等待接受
              <span className="ml-2 px-2 py-0.5 rounded-full bg-[#c9a87c]/20 text-xs">
                {getTypeCount('pending')}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-[#c9a87c] data-[state=active]:text-[#1a1a1a]"
            >
              进行中
              <span className="ml-2 px-2 py-0.5 rounded-full bg-[#c9a87c]/20 text-xs">
                {getTypeCount('active')}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-[#c9a87c] data-[state=active]:text-[#1a1a1a]"
            >
              已完成
              <span className="ml-2 px-2 py-0.5 rounded-full bg-[#c9a87c]/20 text-xs">
                {getTypeCount('completed')}
              </span>
            </TabsTrigger>
          </TabsList>

          {['pending', 'active', 'completed'].map((tabType) => (
            <TabsContent key={tabType} value={tabType}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDelegations
                  .filter((d) => d.type === tabType)
                  .map((delegation) => (
                    <div
                      key={delegation.id}
                      className="group p-5 rounded-xl bg-[#1a1a1a] border border-[#c9a87c]/10 hover:border-[#c9a87c]/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        {getStatusBadge(delegation.type)}
                        <div className="flex items-center gap-1 text-[#c9a87c]">
                          <Sparkles className="w-4 h-4" />
                          <span className="font-medium">{delegation.poolAmount}</span>
                          <span className="text-xs">LKB</span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg font-medium text-[#e9e4df] mb-2 group-hover:text-[#c9a87c] transition-colors">
                        {delegation.title}
                      </h3>
                      <p className="text-sm text-[#e9e4df]/50 line-clamp-2 mb-4">
                        {delegation.description}
                      </p>

                      {/* Category */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-2 py-1 rounded-md bg-[#c9a87c]/10 text-xs text-[#c9a87c]">
                          {delegation.category}
                        </span>
                        {delegation.participants > 0 && (
                          <span className="px-2 py-1 rounded-md bg-[#1a1a1a] text-xs text-[#e9e4df]/40">
                            {delegation.participants} 人参与
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#c9a87c]/10">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#c9a87c]/20 flex items-center justify-center text-sm text-[#c9a87c]">
                            {delegation.creator.avatar}
                          </div>
                          <div>
                            <p className="text-sm text-[#e9e4df]">{delegation.creator.name}</p>
                            <p className="text-xs text-[#e9e4df]/40">
                              信誉 {delegation.creator.reputation}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#e9e4df]/30 group-hover:text-[#c9a87c] group-hover:translate-x-1 transition-all" />
                      </div>

                      {/* Acceptor Info (for active) */}
                      {delegation.acceptor && (
                        <div className="mt-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                          <p className="text-xs text-emerald-400 mb-1">执行者</p>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-400">
                              {delegation.acceptor.avatar}
                            </div>
                            <span className="text-sm text-[#e9e4df]">{delegation.acceptor.name}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              {filteredDelegations.filter((d) => d.type === tabType).length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-[#e9e4df]/30" />
                  </div>
                  <p className="text-[#e9e4df]/50">暂无符合条件的委托</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Pool Info Section */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-[#c9a87c]/20 to-[#1a1a1a] border border-[#c9a87c]/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#c9a87c] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#1a1a1a]" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#e9e4df]">币池动态</h3>
              <p className="text-sm text-[#e9e4df]/50">实时委托币池统计</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '等待中币池', value: '12,500 LKB', change: '+5.2%' },
              { label: '进行中币池', value: '28,300 LKB', change: '+12.8%' },
              { label: '今日完成', value: '8,200 LKB', change: '+23.1%' },
              { label: '累计奖励', value: '156,800 LKB', change: '+8.7%' },
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-xl bg-[#0f0f0f]/50">
                <p className="text-xs text-[#e9e4df]/40 mb-1">{item.label}</p>
                <p className="text-lg font-medium text-[#e9e4df]">{item.value}</p>
                <p className="text-xs text-emerald-400 mt-1">{item.change}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunitySim;
