import dayjs from 'dayjs';
import pinologger from 'pino';

const logger = pinologger({
  transport: {
    target: 'pino-pretty',
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default logger;
