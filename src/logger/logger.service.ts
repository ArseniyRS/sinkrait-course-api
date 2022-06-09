import {Logger} from 'tslog';
export class LoggerService{
 logger: Logger;
 constructor(){
   this.logger = new Logger({
     displayInstanceName: false,
     displayLoggerName: false,
     displayFilePath: 'hidden',
     displayFunctionName: false
   });
 }

 info(...args: unknown[]){
   this.logger.info(...args);
 }

 error(...args: unknown[]){
   this.logger.error(...args);
 }

 warn(...args: unknown[]){
   this.logger.warn(...args);
 }
}