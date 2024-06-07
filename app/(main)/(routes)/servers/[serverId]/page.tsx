interface ServerIdPage {
  params: {
    serverId: string
  }
}

const ServerIdPage = ({ params }: ServerIdPage) => {
  const { serverId } = params

  console.log(serverId)

  return <div>ServerIdPage {serverId}</div>
}

export default ServerIdPage
