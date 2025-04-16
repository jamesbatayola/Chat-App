import kleur from "kleur";

import { searchFriend, addFriend } from "../services/home/searchFriend.js";

import {
  showPending,
  showAdded,
  cancelFriendRequest,
  acceptFriendRequest,
} from "../services/home/friendRequest.js";

// import User from "../models/user.js";
// import Friendship from "../models/friendship.js";

import db from "../../Models/Index.js";
import { sendMessage, showChatRoom } from "../services/home/Chat_Room.js";

const getHome = async (req, res, next) => {
  try {
    const user_chat_rooms = await req.user.getChatRooms();

    const friend_list = [];

    for (let room of user_chat_rooms) {
      const users = await room.getUsers();

      for (let user of users) {
        //
        if (user.id !== req.user.id) {
          friend_list.push({
            username: user.username,
            id: user.id,
            chat_room_id: room.id,
          });
        }
        //
      }
    }

    res.render("home/home.ejs", {
      friends: friend_list,
    });
  } catch (err) {
    next(err);
  }
};

const getFriendRequest = async (req, res, next) => {
  try {
    const show_pendings = await showPending(req);

    const show_who_added_you = await showAdded(req);

    res.render("home/friend_request", {
      my_id: req.user.id,
      pendingAdded: show_pendings,
      addedYou: show_who_added_you,
    });
  } catch (err) {
    next(err);
  }
};

const getSearchFriend = async (req, res, next) => {
  res.render("home/search_friend", {
    user: req.user,
  });
};

const postSearchFriend = async (req, res, next) => {
  try {
    const users = await searchFriend(req);

    res.status(200).json({
      users,
    });
  } catch (err) {
    next(err);
  }
};

const postAddFriend = async (req, res, next) => {
  try {
    const addFriendRes = addFriend(req);

    res.status(200).json({
      status: "success",
      message: `${req.body.userName} is added`,
    });
  } catch (err) {
    next(err);
  }
};

const postCancelRequest = async (req, res, next) => {
  try {
    cancelFriendRequest(req);

    res.status(200).json({
      status: "success",
      messge: `Successfully cancel friend request`,
    });
  } catch (err) {
    next(err);
  }
};

const postAcceptRequest = async (req, res, next) => {
  try {
    acceptFriendRequest(req);

    res.status(200).json({
      status: "success",
      message: "successfully accepted friend request",
    });
  } catch (err) {
    next(err);
  }
};

const getChatRoom = async (req, res, next) => {
  try {
    showChatRoom(req);

    res.status(200).json({
      status: "success",
      message: "redirecting to chatroom",
    });
  } catch (err) {
    next(err);
  }
};

const postSendMessage = async (req, res, next) => {
  try {
    sendMessage(req);

    res.status(200).json({
      status: "success",
      message: "message sent",
    });
  } catch (err) {}
};

export default {
  getHome,
  getFriendRequest,
  getSearchFriend,
  postSearchFriend,
  postAddFriend,
  postCancelRequest,
  postAcceptRequest,
  getChatRoom,
  postSendMessage,
};
