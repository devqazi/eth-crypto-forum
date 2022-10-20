// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CryptoForum {

  struct Topic {
    uint256 id;
    string title;
    string message;
    address author;
    uint createdAt;
  }

  mapping(address => string) public nicknames;

  struct Comment {
    uint256 id;
    uint256 topicId;
    string message;
    address author;
    uint256 createdAt;
  }

  Topic[] public topics;
  Comment[] public comments;

  constructor() {}

  function setNickname(string memory desiredNickname) public {
    nicknames[msg.sender] = desiredNickname;
  }

  function createTopic(string memory _title, string memory _message ) public onlyKilobyte(_message) {
    Topic memory newTopic = Topic({
      id: topics.length,
      title: _title,
      message: _message,
      author: msg.sender,
      createdAt: block.timestamp 
    });
    topics.push(newTopic);
  }

  function createComment(string memory _message, uint256 _topicId) public onlyKilobyte(_message) {
    Comment memory newComment = Comment({
      id: comments.length,
      topicId: _topicId,
      message: _message,
      author: msg.sender,
      createdAt: block.timestamp
    });
    comments.push(newComment);
  }

  function getNextComment (uint256 _topicId, uint256 offset) public view returns (Comment memory) {
    Comment memory foundComment;
    uint256 counter = 0;
    bool found = false;
    for (uint256 i = 0; i < comments.length; i++ ) {
      if (comments[i].topicId == _topicId) {
        if (counter == offset) {
          foundComment = comments[i];
          found = true;
          break;
        } else {
          counter++;
        }
      }
    }
    require(found == true);
    return foundComment;
  }

  modifier onlyKilobyte (string memory _message) {
    if (bytes(_message).length <= 1024) {
      _;
    }
  }
}