import { Subscriber } from "@/interfaces/subscriber"

export default async function addUpdateSubscriber(isSubscribed: boolean, subscriber: Subscriber): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const updateEndpoint = process.env.NEXT_PUBLIC_MAIN_API
    const createEndpoint = process.env.NEXT_PUBLIC_MAIN_API
    let payload
  
    const body = {
      email_address: subscriber.email_address,
      tech_subscribed: subscriber.tech_subscribed,
      web_subscribed: subscriber.web_subscribed,
      ai_subscribed: subscriber.ai_subscribed,
    }
    
    if (isSubscribed) {
      payload = await fetch(`${updateEndpoint}/update/${subscriber.email_address}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      })
    } else {
      payload = await fetch(`${createEndpoint}/create`, {
        method: "POST",
        body: JSON.stringify(body),
      })
    }

    if (payload) {
      resolve(payload.json())
    }
    reject()
  })
}