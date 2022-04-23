
import TelegramBot from 'node-telegram-bot-api';

const TOKEN = '5391750034:AAEUptLGtIGbWZjQZnbaB0o8RnYeYk8BQa4';
const bot = new TelegramBot(TOKEN, { polling: true });

const MORNING_EMPLOYEE_COUNT = 4;
const NIGHT_EMPLOYEE_COUNT = 4;
const SUPERVISOR_CHAT_ID = ['', ''];
const MORNING_CHAT_ID = ['', '', '', ''];
const NIGHT_CHAT_ID = ['', '', '', ''];
const ALL_EMPLOYEE_CHAT_ID = MORNING_CHAT_ID.concat(NIGHT_CHAT_ID);
let morningArrive: Array<string|undefined> = [];
let nightArrive: Array<string|undefined> = [];

bot.onText(/^report-/, (message: TelegramBot.Message) => {
	const chatId = message.chat.id.toString();
	let emplyeeCode = message.text?.split('-')[1];
	let sendIdArray: string[] = [];
	let sendMsg: string = '';

	if(ALL_EMPLOYEE_CHAT_ID.indexOf(chatId)<0){
		return;
	}

	if(MORNING_CHAT_ID.indexOf(chatId)>=0){
		morningArrive.push(emplyeeCode);
		sendMsg = `${morningArrive.length}/${MORNING_EMPLOYEE_COUNT}(${morningArrive})`;
		sendIdArray = MORNING_CHAT_ID.concat(SUPERVISOR_CHAT_ID);
		
		if(morningArrive.length>=MORNING_EMPLOYEE_COUNT){
			morningArrive.length = 0;
		}

	}

	if(NIGHT_CHAT_ID.indexOf(chatId)>=0){
		nightArrive.push(emplyeeCode);
		sendMsg = `${nightArrive.length}/${NIGHT_EMPLOYEE_COUNT}(${nightArrive})`;
		sendIdArray = NIGHT_CHAT_ID.concat(SUPERVISOR_CHAT_ID);
		if(nightArrive.length>=NIGHT_EMPLOYEE_COUNT){
			nightArrive.length = 0;
		}
	}
	
	sendIdArray.forEach((chatId)=>{
		if(chatId){
			bot.sendMessage(chatId, sendMsg);
		}
	});
});