import React from 'react'
import Image from 'next/image'

const NotificationListItems = ({ getLikedPostOrComment, note, }) => {
  return (
    <li
            key={note._id}
            className="w-full border-b-2 border-dotted border-yellow-950 pt-4"
          >
            <div
              className="flex cursor-pointer flex-col"
              onClick={() => getLikedPostOrComment(note.postId)}
            >
              {(note.post || note.comment) && (
                <div className="flex w-full flex-col text-yellow-900">
                  <div className="flex justify-center pb-2">
                    <Image
                      src={note?.sender.avatar || "/images/logo_yellow.png"}
                      alt="logo"
                      width={100}
                      height={0}
                      className="h-[30px] w-[30px] rounded-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-start">
                    <div className="text-yellow-950">
                      <span className="font-semibold">
                        {note.sender?.name || note.sender?.username}
                      </span>{" "}
                      {note.type === "like" &&
                        (note.post ? (
                          <>
                            vindt je bericht leuk: <br />
                            <span>
                              {note.post?.postContent.length < 60
                                ? note.post?.postContent
                                : note.post?.postContent.slice(0,60) + "..."}
                            </span>

                          </>
                        ) : (
                          <>
                            vindt je reactie leuk: <br />
                            <span>
                              {note.comment?.comment.length < 60
                                ? note.comment?.comment
                                : note.comment?.comment.slice(0, 60) + "..."}
                            </span>
                          </>
                        ))}
                        
                      {note.type === "comment" &&
                        (note.comment?.parentId && note.comment ? (
                          <>
                            reageerde op jou reactie: <br />
                            <span>{note.comment?.comment}</span>
                          </>
                        ) : (
                          <>
                            reageerde op jou bericht: <br />
                            <span>
                              {note.comment?.comment.length < 35
                                ? note.comment?.comment
                                : note.comment?.comment.slice(0, 35) + "..."}
                            </span>
                          </>
                        ))}
                    </div>

                    <div className="mb-6 flex flex-col border-yellow-900 pb-2">
                      <small className="pt-1 text-gray-500">
                        Gepost op : {new Date(note.createdAt).toLocaleString()}
                      </small>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </li>
  )
}

export default NotificationListItems