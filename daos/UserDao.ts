/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB.
 */
import UserModel from "../mongoose/users/UserModel";
import User from "../models/users/User";
import UserDaoI from "../interfaces/UserDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class UserDao implements UserDaoI {
    private static userDao: UserDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns {UserDao} UserDao
     */
    public static getInstance = (): UserDao => {
        if(UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }

    private constructor() {}

    /**
     * Uses UserModel to retrieve all user documents from users collection.
     * @returns {Promise} Promise to be notified when the users are retrieved from
     * database
     */
    findAllUsers = async (): Promise<User[]> =>
        UserModel.find().exec();

    /**
     * Uses UserModel to retrieve single user document from users collection.
     * @param {string} uid Primary key of user
     * @returns {Promise} Promise to be notified when user is retrieved from the database
     */
    findUserById = async (uid: string): Promise<any> =>
        UserModel.findById(uid);

    /**
     * Inserts user instance into the database.
     * @param {User} user instance to be inserted into the database
     * @returns {Promise} Promise to be notified when user is inserted into the database
     */
    createUser = async (user: User): Promise<User> =>
        UserModel.create(user);

    /**
     * Updates user with new values in database.
     * @param {string} uid Primary key of user to be modified
     * @param {User} user User object containing properties and their new values
     * @returns {Promise} Promise to be notified when user is updated in the database
     */
    updateUser = async (uid: string, user: User): Promise<any> =>
        UserModel.updateOne(
            {_id: uid},
            {$set: user});

    /**
     * Updates user salary with new value in database.
     * @param {string} username of user
     * @param {string} salary of user
     * @returns {Promise} Promise to be notified when user salary is updated
     */
    updateUserSalaryByUsername = async (username: string, salary: number): Promise<any> =>
        UserModel.updateOne(
            {username},
            {$set: {salary: salary}});

    /**
     * Removes user from the database.
     * @param {string} uid Primary key of user to be removed
     * @returns {Promise} Promise to be notified when user is removed from the database
     */
    deleteUser = async (uid: string): Promise<any> =>
        UserModel.deleteOne({_id: uid});

    /**
     * Removes all users from the database. Useful for testing.
     * @returns {Promise} Promise to be notified when all users are removed from the
     * database
     */
    deleteAllUsers = async (): Promise<any> =>
        UserModel.deleteMany({});

    /**
     * Uses UserModel to retrieve single user document from users collection
     * from a username and password.
     * @param {string} username user uses to be identified
     * @param {string} password user uses to log into their account
     * @returns {Promise} Promise to be notified when user is retrieved from the database
     */
    findUserByCredentials = async (username: string, password: string): Promise<any> =>
        UserModel.findOne({username: username, password: password});

    /**
     * Uses UserModel to retrieve single user document from users collection
     * from a username.
     * @param {string} username user uses to be identified
     * @returns {Promise} Promise to be notified when user is retrieved from the database
     */
    findUserByUsername = async (username: string): Promise<any> =>
        UserModel.findOne({username});
};