/**
 * @file declares API for Follows related data access object methods.
 */
import Follow from "../models/follows/Follow";

export default interface FollowDaoI {
    findAllFollows (): Promise<Follow[]>;
    userFollowsUser (uid: string, ouid: string): Promise<Follow>;
    userUnfollowsUser (uid: string, ouid: string): Promise<any>;
    findAllUsersFollowingUser (uid: string): Promise<Follow[]>;
    findAllUsersFollowedByUser (uid: string): Promise<Follow[]>;
    findFollowByUsers (uid: string, ouid: string): Promise<Follow[]>;
};