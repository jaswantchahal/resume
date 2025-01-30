import io from 'socket.io-client';
import { useMemo } from 'react';
import { app } from "../config/index";
//import { SOCKET_URL } from '@env';

const SOCKET_URL_LOCAL = app.baseUrl

var socket: any
class WSService {
    initializeSocket = () => {
        return new Promise<string>((resolve, reject) => {
            try {
                socket = io(SOCKET_URL_LOCAL, {
                    transports: ['websocket']
                });

                socket.on('connect', async () => {
                    // console.log("=== socket connected ====");

                    const userId = await localStorage.getItem('userId')
                    // console.log("has userISD>>>>",userId)
                    if (userId) {
                        socket.emit('registerUser', userId, (response: any) => {
                            if (response.success) {
                                // console.log(`User ${userId} registered successfully`);
                            } else {
                                console.error(`Registration failed: ${response.error}`);
                            }
                        });
                    }

                    resolve(socket.id);
                });

                socket.on('disconnect', (data: unknown) => {
                    // console.log("=== socket disconnected ====");
                    reject('Socket disconnected');
                });

                socket.on('error', (data: unknown) => {
                    // console.log("socket error", data);
                    reject('Socket error');
                });
            } catch (error) {
                // console.log("socket is not initialized", error);
                reject(error);
            }
        });
    };

    emit(event: string, data: any, callback?: (response: any) => void) {
        if (socket) {
            socket.emit(event, data, callback);
        } else {
            // console.log('Socket is not properly initialized.');
        }
    }

    on(event: string, cb: unknown) {
        socket.on(event, cb)
    }

    emitCallback(event: string, data: any, callback: any) {
        if (socket) {
            socket.emit(event, data, (response: any) => {
                if (typeof callback === 'function') {
                    callback(response);
                }
            });
        } else {
            console.error('Socket is not properly initialized.');
        }
    }

    removeListener(listenerName: unknown) {
        socket.removeListener(listenerName)
    }

    emitWithPromise(event: string, data: unknown) {
        return new Promise((resolve, reject) => {
            socket.emit(event, data, (response: any) => {
                if (response.error) {
                    reject(response.error);
                } else {
                    resolve(response);
                }
            });
        });
    }

}

const useSocketService = () => {
    const socketService = useMemo(() => new WSService(), []);
    return socketService;
};

//const socketServcies = new WSService()

export default useSocketService