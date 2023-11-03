import { Avatar, AvatarImage } from "@/components/ui/avatar"

const BotAvatar = () => {
  return (
    <Avatar className="w-10 h-10">
      <AvatarImage className="p-1" src="/logo.gif" />
    </Avatar>
  )
}

export default BotAvatar
