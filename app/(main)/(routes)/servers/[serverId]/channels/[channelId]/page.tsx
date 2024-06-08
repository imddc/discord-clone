interface ChannelIdPageProps {
  params: {
    channelId: string
  }
}

const ChannelIdPage = ({ params }: ChannelIdPageProps) => {
  const { channelId } = params
  return <div>ChannelIdPage {channelId}</div>
}

export default ChannelIdPage
