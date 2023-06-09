export default function getcolor(message: string): string {
  switch (message) {
    case 'waiting_payment':
      return 'text-orange-3';
    case 'waiting_confirmation':
      return 'text-blue-3';
    case 'processing':
      return 'text-blue-6';
    case 'done':
      return 'text-green-7';
    case 'denied':
      return 'text-red-7';
    default:
      return 'text-grey';
  }
}
