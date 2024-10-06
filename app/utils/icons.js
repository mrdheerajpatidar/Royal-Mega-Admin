import React from 'react';
import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';
import { FaUserCircle, FaUserEdit, FaCopy, FaUserTie } from 'react-icons/fa';
import {
  IoChevronDown,
  IoChevronBack,
  IoChevronForward,
  IoChevronUpOutline,
  IoAlertCircleOutline,
} from 'react-icons/io5';
import {
  MdDashboard,
  MdOutlineModeEdit,
  MdVerified,
  MdOutlineModeEditOutline,
  MdDelete,
  MdOutlineVideogameAsset,
  MdOutlineSportsCricket,
  MdSupportAgent,
  MdOutlinePrivacyTip,
  MdOutlineNotificationsActive,
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdFileUpload,
} from 'react-icons/md';
import { BiLogOut, BiSolidDollarCircle } from 'react-icons/bi';
import { TbArrowsRightLeft } from 'react-icons/tb';
import {
  FaGears,
  FaBowlingBall,
  FaUsers,
  FaList,
  FaRegCircleQuestion,
  FaPlus,
  FaMinus,
} from 'react-icons/fa6';
import { FaCalendarAlt, FaWallet } from 'react-icons/fa';
import { BsThreeDotsVertical, BsBank2 } from 'react-icons/bs';
import { IoMdSearch, IoMdClose, IoMdAdd } from 'react-icons/io';
import { SlCalender } from 'react-icons/sl';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { PiGameControllerBold } from 'react-icons/pi';
import { GiCard10Clubs } from 'react-icons/gi';
import { RiCoupon3Fill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';
import { GrTransaction } from 'react-icons/gr';
import { GiVerticalBanner } from 'react-icons/gi';
import { IoMdDownload } from 'react-icons/io';
import { MdNotifications } from 'react-icons/md';
import { FaBell } from 'react-icons/fa';
import { FaVideo } from 'react-icons/fa';
import { CgFileDocument } from 'react-icons/cg';
import { LuUpload } from 'react-icons/lu';
import { HiMiniBanknotes } from 'react-icons/hi2';

export const reactIcons = {
  uploadDoc: <LuUpload />,
  doc: <CgFileDocument />,
  close: <IoMdClose />,
  eyeslash: <AiFillEyeInvisible />,
  eyes: <AiFillEye />,
  chevronDown: <IoChevronDown />,
  chevronUp: <IoChevronUpOutline />,
  chevronLeft: <IoChevronBack />,
  chevronRight: <IoChevronForward />,
  user: <FaUserCircle />,
  dashboard: <MdDashboard />,
  editUser: <FaUserEdit />,
  editPencil: <MdOutlineModeEdit />,
  logout: <BiLogOut />,
  verified: <MdVerified />,
  copy: <FaCopy />,
  edit: <MdOutlineModeEditOutline />,
  delete: <MdDelete />,
  leftRightArrow: <TbArrowsRightLeft />,
  game: <MdOutlineVideogameAsset />,
  cricket: <MdOutlineSportsCricket />,
  addUser: <AiOutlineUsergroupAdd />,
  twoGear: <FaGears />,
  support: <MdSupportAgent />,
  privacy: <MdOutlinePrivacyTip />,
  bell: <MdOutlineNotificationsActive />,
  menu: <BsThreeDotsVertical />,
  search: <IoMdSearch />,
  calender: <SlCalender />,
  add: <IoMdAdd />,
  leftArrow: <FaArrowLeftLong />,
  agent: <FaUserTie />,
  games: <PiGameControllerBold />,
  club: <GiCard10Clubs />,
  dollar: <BiSolidDollarCircle />,
  ball: <FaBowlingBall />,
  lottri: <RiCoupon3Fill />,
  users: <FaUsers />,
  setting: <IoMdSettings />,
  transaction: <GrTransaction />,
  sales: <FaList />,
  request: <FaRegCircleQuestion />,
  plus: <FaPlus />,
  minus: <FaMinus />,
  weeklyCalendar: <FaCalendarAlt />,
  wallet: <FaWallet />,
  account: <BsBank2 />,
  checkbox: <MdOutlineCheckBoxOutlineBlank />,
  checkboxfill: <MdOutlineCheckBox />,
  banners: <GiVerticalBanner />,
  upload: <MdFileUpload />,
  download: <IoMdDownload />,
  notification: <MdNotifications />,
  notificationBold: <FaBell />,
  blog: <FaVideo />,
  alert: <IoAlertCircleOutline />,
  note: <HiMiniBanknotes />,
};

// Example usage:
