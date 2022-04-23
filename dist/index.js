"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const TOKEN = '5391750034:AAEUptLGtIGbWZjQZnbaB0o8RnYeYk8BQa4';
const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
const MORNING_EMPLOYEE_COUNT = 4;
const NIGHT_EMPLOYEE_COUNT = 4;
const SUPERVISOR_CHAT_ID = ['', ''];
const MORNING_CHAT_ID = ['', '', '', ''];
const NIGHT_CHAT_ID = ['', '', '', ''];
const ALL_EMPLOYEE_CHAT_ID = MORNING_CHAT_ID.concat(NIGHT_CHAT_ID);
let morningArrive = [];
let nightArrive = [];
bot.onText(/^report-/, (message) => {
    var _a;
    const chatId = message.chat.id.toString();
    let emplyeeCode = (_a = message.text) === null || _a === void 0 ? void 0 : _a.split('-')[1];
    let sendIdArray = [];
    let sendMsg = '';
    if (ALL_EMPLOYEE_CHAT_ID.indexOf(chatId) < 0) {
        return;
    }
    if (MORNING_CHAT_ID.indexOf(chatId) >= 0) {
        morningArrive.push(emplyeeCode);
        sendMsg = `${morningArrive.length}/${MORNING_EMPLOYEE_COUNT}(${morningArrive})`;
        sendIdArray = MORNING_CHAT_ID.concat(SUPERVISOR_CHAT_ID);
        if (morningArrive.length >= MORNING_EMPLOYEE_COUNT) {
            morningArrive.length = 0;
        }
    }
    if (NIGHT_CHAT_ID.indexOf(chatId) >= 0) {
        nightArrive.push(emplyeeCode);
        sendMsg = `${nightArrive.length}/${NIGHT_EMPLOYEE_COUNT}(${nightArrive})`;
        sendIdArray = NIGHT_CHAT_ID.concat(SUPERVISOR_CHAT_ID);
        if (nightArrive.length >= NIGHT_EMPLOYEE_COUNT) {
            nightArrive.length = 0;
        }
    }
    sendIdArray.forEach((chatId) => {
        if (chatId) {
            bot.sendMessage(chatId, sendMsg);
        }
    });
});
