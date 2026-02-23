import { Message } from '../types'

export function getMockMessages(matchUserId: string): Message[] {
  return [
    {
      id: 'm1',
      senderId: matchUserId,
      text: 'Hey! Looking forward to meeting up.',
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
    },
    {
      id: 'm2',
      senderId: 'me',
      text: 'Same here. The spot on the corner works well.',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
    },
    {
      id: 'm3',
      senderId: matchUserId,
      text: 'Perfect. I am grabbing a coffee on the way.',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
    },
    {
      id: 'm4',
      senderId: 'me',
      text: 'See you in a bit.',
      timestamp: new Date(Date.now() - 60 * 1000),
    },
  ]
}
