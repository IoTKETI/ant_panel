<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card class="v2" outlined color="transparent">
                        <v-btn
                            class="b1"
                            color="white"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            @click="doRun"
                        >
                            R U N
                        </v-btn>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <v-btn
                            class="b3"
                            color="#AAFF00"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            v-on="{ mousedown: tiltUp, mouseup: tiltUpStop }"
                        >
                            <v-progress-linear
                                color="#AAFF00"
                                :height="150"
                                v-model="pTilt"
                                :orientation="'vertical'"
                                style="pointer-events: none"

                            >
                                <template>
                                    <!-- <strong>{{ Math.ceil(value) }}</strong> -->
                                    <strong class="bt2">T I L T<br/><br/>U P</strong>
                                </template>
                            </v-progress-linear>
                            <p class="r90" :orientation="'vertical'"></p>
                        </v-btn>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card class="v2" outlined color="transparent">
                        <v-btn
                            class="b1"
                            color="white"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            @click="init"

                        >
                            I N I T
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <v-btn
                            class="b1"
                            color="#FF00AA"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            v-on="{ mousedown: panDown, mouseup: panDownStop }"
                        >
                            <v-progress-linear
                                color="#FF00AA"
                                :height="150"
                                reverse
                                v-model="nPan"
                                style="pointer-events: none"
                            >
                                <template>
                                    <!-- <strong>{{ Math.ceil(value) }}</strong> -->
                                    <strong class="bt1">P A N<br/><br/>D O W N</strong>
                                </template>
                            </v-progress-linear>
                        </v-btn>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <p>&nbsp;</p>
                        <v-row>
                            <v-col>
                            </v-col>
                            <v-col>
                                <p class="f2 font-weight-black">PAN</p>
                            </v-col>
                            <v-col>
                                <p class="f2 font-weight-black">{{ myPan }}</p>
                            </v-col>
                            <v-col>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                            </v-col>
                            <v-col>
                                <p class="f2 font-weight-black">TILT</p>
                            </v-col>
                            <v-col>
                                <p class="f2 font-weight-black">{{ myTilt }}</p>
                            </v-col>
                            <v-col>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <v-btn
                            class="b1"
                            color="#FF00AA"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            v-on="{ mousedown: panUp, mouseup: panUpStop }"
                        >
                            <v-progress-linear color="#FF00AA" :height="150" v-model="pPan"
                                               style="pointer-events: none">
                                <template>
                                    <!-- <strong>{{ Math.ceil(value) }}</strong> -->
                                    <strong class="bt1">P A N<br/><br/>U P</strong>
                                </template>
                            </v-progress-linear>
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <br><br>
                    <p class="f1 font-weight-black">Drone IP: </p><br>
                    <p class="f1 font-weight-black">
                        {{
                            connection.host
                        }}</p>

                </v-col>

                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <v-btn
                            class="b4"
                            color="#AAFF00"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            v-on="{ mousedown: tiltDown, mouseup: tiltDownStop }"
                        >
                            <v-progress-linear color="#AAFF00" :height="150" v-model="nTilt"
                                               style="pointer-events: none">
                                <template>
                                    <!-- <strong>{{ Math.ceil(value) }}</strong> -->
                                    <strong class="bt3">T I L T<br/><br/>D O W N</strong>
                                </template>
                            </v-progress-linear>
                        </v-btn>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="v2" outlined color="transparent">
                        <p class="f2">&nbsp;</p>
                        <p class="f2 font-weight-black">Antena Tracker</p>

                        <p class="f2 font-weight-black">Control Panel</p>
                        <p class="f2 font-weight-black"></p>
                    </v-card>
                </v-col>
            </v-row>


        </v-container>
    </div>
</template>

<script>
import mqtt from "mqtt";
import {nanoid} from "nanoid";
import os from "os";

export default {
    name: "app",
    components: {},

    data() {
        return {
            interval: {},


            //location data
            loca_obj: {
                myLatitude: 37.403625,
                myLongitude: 127.16177,
                myAltitude: 0,
            },


            myPan: 0,
            myTilt: 0,

            pPan: 0,
            nPan: 0,

            pTilt: 0,
            nTilt: 0,

            // mqtt 연결부
            client: {
                connected: false,
                loading: false,
            },
            connection: {
                //host: "127.0.0.1",
                //host: data.host,
                host: '',
                port: 8883,
                //port: 1883,
                endpoint: "",
                clean: true,
                connectTimeout: 4000,
                reconnectPeriod: 4000,
                clientId: "jiho_" + nanoid(15),
                username: "keti_muv",
                password: "keti_muv",
            },

            getDataTopic: {
                pan: "/Ant_Tracker/Motor_Pan",
                tilt: "/Ant_Tracker/Motor_Tilt",
            },

            motorControlTopic: "/Ant_Tracker/Control",
            //motorLocationTopic: "/Ant_Tracker/Location_Data",

            // mqtt end

            console_text_message: "",
            chk: "",

            response_text: "",
            rev_connted: false,
        };
    },

    methods: {
        // sendloca: function () {
        //   console.log(JSON.stringify(this.loca_obj));
        //   this.doPublish(this.motorLocationTopic, JSON.stringify(this.loca_obj));
        // },

        tiltUp: function () {
            this.doPublish(this.motorControlTopic, "tilt_up");
        },
        tiltUpStop: function () {
            this.doPublish(this.motorControlTopic, "stop");
        },
        tiltDown: function () {
            this.doPublish(this.motorControlTopic, "tilt_down");
        },
        tiltDownStop: function () {
            this.doPublish(this.motorControlTopic, "stop");
        },
        panDown: function () {
            this.doPublish(this.motorControlTopic, "pan_down");
        },
        panDownStop: function () {
            this.doPublish(this.motorControlTopic, "stop");
        },
        panUp: function () {
            this.doPublish(this.motorControlTopic, "pan_up");
        },
        panUpStop: function () {
            this.doPublish(this.motorControlTopic, "stop");
        },
        doRun: function () {
            this.doPublish(this.motorControlTopic, "run");
        },
        init: function () {
            this.doPublish(this.motorControlTopic, "init");
        },
        // onMessageHandler(topic, message) {
        //     let chkTopic = topic.substr(0, 7);
        //
        //     if (chkTopic === "/oneM2M") {
        //         console.log(message.toString());
        //     }
        // },

        createConnection() {
            console.log("createConnection () 시작!");
            if (this.client.connected) {
                this.destroyConnection();
            }

            if (!this.client.connected) {
                this.client.loading = true;
                this.connection.clientId = "mqttjs_" + "jiho" + "_" + nanoid(15);
                // TODO: Crow-S 연동 시 '127.0.0.1'로 연결하도록 수정
                // this.connection.host = "127.0.0.1";
                console.log('Host is : ' + this.connection.host);
                const {host, port, endpoint, ...options} = this.connection;
                const connectUrl = `ws://${host}:${port}${endpoint}`;
                try {
                    this.client = mqtt.connect(connectUrl, options);

                    this.client.on("connect", () => {
                        console.log(connectUrl, "Connection succeeded!");
                        console.log(host, "Connection succeeded!");

                        this.client.connected = true;
                        this.client.loading = false;

                        this.doSubscribe(this.getDataTopic.pan);
                        console.log("pan subscribe !!!! ");
                        this.doSubscribe(this.getDataTopic.tilt);
                        console.log("tilt subscribe !!!! ");

                        //console.log("myTilt: " + this.myTilt);

                        // let subtopic = "/oneM2M/req/Mobius2/" + "Sketi" + "/#";
                        //
                        // this.doUnSubscribe(subtopic);
                        //
                        // setTimeout(() => {
                        //     this.doSubscribe(subtopic);
                        //     console.log("Subscribe to ", subtopic);
                        // }, 200);
                    });

                    this.client.on("error", (error) => {
                        console.log("Connection failed", error);

                        this.destroyConnection();
                    });

                    this.client.on("close", () => {
                        console.log("Connection closed");

                        this.destroyConnection();

                        this.connection.clientId = "mqttjs_" + "jiho" + "_" + nanoid(15);
                    });

                    this.client.on("message", (topic, message) => {
                        console.log("Received " + message.toString() + " From " + topic);

                        if (topic === this.getDataTopic.pan) {
                            this.myPan = parseInt(message.toString()).toFixed(1);
                            this.myPan = parseInt(this.myPan);

                            if (this.myPan > 0) {
                                this.pPan = (this.myPan / 360) * 100;
                                this.pPan = parseInt(this.pPan);
                                this.nPan = 0;
                            } else {
                                this.nPan = Math.abs(this.myPan);
                                this.nPan = (this.nPan / 360) * 100;
                                this.nPan = parseInt(this.nPan);
                                this.pPan = 0;
                            }
                        } else if (topic === this.getDataTopic.tilt) {
                            this.myTilt = parseInt(message.toString()).toFixed(1);
                            this.myTilt = parseInt(this.myTilt);

                            if (this.myTilt > 0) {
                                this.pTilt = (this.myTilt / 360) * 100;
                                this.pTilt = parseInt(this.pTilt);
                                this.nTilt = 0;
                            } else {
                                this.nTilt = Math.abs(this.myTilt);
                                this.nTilt = (this.nTilt / 360) * 100;
                                this.nTilt = parseInt(this.nTilt);
                                this.pTilt = 0;
                            }
                        }
                    });
                } catch (error) {
                    console.log("mqtt.connect error", error);
                    this.client.connected = false;

                    setTimeout(this.createConnection, 2000);
                }
            }
        },


        doSubscribe(topic) {
            if (this.client.connected) {
                const qos = 0;
                this.client.subscribe(topic, {qos}, (error) => {
                    if (error) {
                        console.log("Subscribe to topics error", error);
                        return;
                    }

                    console.log("Subscribe to topics (", topic, ")");
                });
            }
        },

        doUnSubscribe(topic) {
            if (this.client.connected) {
                this.client.unsubscribe(topic, (error) => {
                    if (error) {
                        console.log("Unsubscribe error", error);
                    }

                    console.log("Unsubscribe to topics (", topic, ")");
                });
            }
        },

        doPublish(topic, payload) {
            if (this.client.connected) {
                this.client.publish(topic, payload, 0, (error) => {
                    if (error) {
                        console.log("Publish error", error);
                    }
                });
            }
        },

        destroyConnection() {
            if (this.client.connected) {
                try {
                    if (Object.hasOwnProperty.call(this.client, "__ob__")) {
                        this.client.end();
                    }
                    this.client = {
                        connected: false,
                        loading: false,
                    };
                    console.log(this.name, "Successfully disconnected!");
                } catch (error) {
                    console.log("Disconnect failed", error.toString());
                }
            }
        },
    },
    created() {
        // TODO: Crow-S 연동 시 삭제
        let net_interfaces = os.networkInterfaces();
        let interface_arr = Object.keys(net_interfaces);
        for (let idx in interface_arr) {
            for (let f in net_interfaces[interface_arr[idx]]) {
                if (net_interfaces[interface_arr[idx]][f].family === 'IPv4') {
                    let withCrowB = net_interfaces[interface_arr[idx]][f].address;
                    if (withCrowB.substring(withCrowB.length - 3, withCrowB.length) === '150') {
                        let addr_arr = withCrowB.split('.');
                        addr_arr[3] = '100';
                        this.connection.host = addr_arr.join('.');
                        console.log('this.connection.host:', this.connection.host);
                    }
                }
            }
        }

        this.createConnection();
    },

    mounted() {
        this.interval = setInterval(() => {
            if (this.value === 100) {
                return (this.value = 0);
            }
            this.value += 10;
        }, 2000);
    },

    /*
      beforeUnmount () {
        clearInterval(this.interval)
      },
  */

    beforeDestroy() {
        this.destroyConnection();
    },
};
</script>

<style lang="scss">
#app {
    text-align: center;
    color: white;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
}

.f1 {
    text-align: center;
    font-weight: white;
    letter-spacing: 2px;
    font-size: 17px;
}

.f2 {
    text-align: center;
    color: white;
    font-weight: white;
    letter-spacing: 4px;
    font-size: 20px;
}

.f3 {
    text-align: center;
    color: white;
    font-weight: white;
    letter-spacing: 3px;
    font-size: 25px;
}

.f4 {
    text-align: center;
    color: white;
    font-weight: white;
    letter-spacing: 3px;
    font-size: 32px;
}

.bt1 {
    text-align: center;
    color: white;
    font-weight: white;
    letter-spacing: 3px;
    font-size: 15px;
}

.bt2 {
    text-align: center;
    color: white;
    font-weight: white;
    letter-spacing: 3px;
    font-size: 15px;
    transform: rotate(90deg);
}

.bt3 {
    text-align: center;
    color: white;
    font-weight: white;
    letter-spacing: 3px;
    font-size: 15px;
    transform: rotate(270deg);
}

.r90 {
    transform: rotate(90deg);
    text-align: center;
    align-content: center;
    align-self: center;
}

.b0 {
    width: 100px;
    min-width: 100px;
    height: 100px;
    min-height: 100px;
}

.b1 {
    width: 200px;
    min-width: 200px;
    height: 200px;
    min-height: 200px;
}

.b2 {
    width: 200px;
    min-width: 200px;
    height: 200px;
    min-height: 200px;
    transform: rotate(180deg);
}

.b3 {
    width: 200px;
    min-width: 200px;
    height: 200px;
    min-height: 200px;
    transform: rotate(270deg);
}

.b4 {
    width: 200px;
    min-width: 200px;
    height: 200px;
    min-height: 200px;
    transform: rotate(90deg);
}

.v1 {
    width: 200px;
    height: 200px;
    min-width: 200px;
    max-width: 200px;
    min-height: 200px;
    max-height: 200px;
}

.v2 {
    width: 200px;
    height: 100px;
    min-width: 200px;
    max-width: 200px;
    min-height: 100px;
    max-height: 100px;
}

.v3 {
    width: 200px;
    height: 100px;
    min-width: 200px;
    max-width: 200px;
    min-height: 100px;
    max-height: 100px;
    border: 1px solid white;
}

.r270 {
    transform: rotate(270deg);
}
</style>
