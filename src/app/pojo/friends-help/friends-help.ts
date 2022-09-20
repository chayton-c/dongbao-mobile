export interface FriendsHelp {
  id: string;
  customerId: string; // 邀请用户
  friendsCustomerId: string; // 助力用户
  friendsAvatar: string;
  friendsName: string;
  friendsHelpActivityId: string; // 活动id
}
