import dbConnect from "../../lib/dbConnect"
import Conversation from "../../models/message"
import { NextResponse } from "next/server"

export async function GET(req) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const lawyer = searchParams.get("lawyer")
  const client = searchParams.get("client")

  if (!lawyer) {
    return NextResponse.json({ error: "Lawyer email is required" }, { status: 400 })
  }

  try {
    if (client) {
      // Fetch messages for a specific conversation
      const conversation = await Conversation.findOne({
        participants: { $all: [lawyer, client] },
      }).sort({ "messages.timestamp": 1 })
      return NextResponse.json({ messages: conversation?.messages || [] })
    } else {
      // Fetch all clients for the lawyer
      const conversations = await Conversation.find({
        participants: lawyer,
      })
      const clients = conversations.map((conv) => conv.participants.find((p) => p !== lawyer)).filter(Boolean)
      return NextResponse.json({ clients })
    }
  } catch (error) {
    console.error("❌ Error fetching data:", error)
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}

export async function POST(req) {
  await dbConnect()
  const body = await req.json()
  const { from, to, content } = body

  if (!from || !to || !content) {
    return NextResponse.json(
      {
        error: "Missing required fields",
        received: { from, to, content },
      },
      { status: 400 },
    )
  }

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [from, to] },
    })

    if (!conversation) {
      conversation = new Conversation({
        participants: [from, to],
        messages: [],
      })
    }

    // Add the new message
    const newMessage = {
      from,
      to,
      content,
      timestamp: new Date(),
      id: Date.now().toString(),
    }
    
    conversation.messages.push(newMessage)
    await conversation.save()

    return NextResponse.json(
      {
        message: "Message saved successfully",
        savedMessage: newMessage,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("❌ Error saving message:", error)
    return NextResponse.json(
      {
        error: "Failed to save message",
        details: error.message,
      },
      { status: 500 },
    )
  }
}