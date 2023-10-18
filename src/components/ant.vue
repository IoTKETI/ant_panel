<template>
    <v-container>
        <div>
            <v-row>
                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <br/><br/>
                        <h2 class="f1 font-weight-black">Antenna</h2>
                        <h2 class="f1 font-weight-black">Tracker</h2>
                        <h2 class="f1 font-weight-black">Control Panel</h2>
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
                            v-on="{
                                mousedown: tiltUp,
                                mouseup: tiltUpStop,
                                touchstart: tiltUp,
                                touchend: tiltUpStop,
                            }"
                            :disabled="!client.connected || !stop_flag"
                        >
                            <v-progress-linear
                                color="#AAFF00"
                                :height="150"
                                v-model="pTilt"
                                :orientation="'vertical'"
                                style="pointer-events: none"
                            >
                                <template>
                                    <strong class="bt2">T I L T<br/><br/>U P</strong>
                                </template>
                            </v-progress-linear>
                        </v-btn>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <v-btn
                            v-if="!tr_run_status"
                            class="b0"
                            color="white"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            @click="doRun"
                            :disabled="!client.connected || !stop_flag"
                        >
                            <strong class="bt1">RUN</strong>
                        </v-btn>
                        <v-btn
                            v-if="tr_run_status"
                            class="b0"
                            color="white"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            @click="doRun"
                            :disabled="!client.connected || stop_flag"
                        >
                            <strong class="bt1">Stop</strong>
                        </v-btn>
                        <v-btn
                            v-if="!tr_arrange_status"
                            class="b0 mt-5"
                            color="white"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            @click="doArrange"
                            :disabled="!client.connected || !stop_flag"
                        >
                            <strong class="bt1">ARRANGE</strong>
                        </v-btn>
                        <v-btn
                            v-if="tr_arrange_status"
                            class="b0 mt-5"
                            color="white"
                            x-large
                            block
                            outlined
                            raised
                            elevation="2"
                            @click="doArrange"
                            :disabled="!client.connected || stop_flag"
                        >
                            <strong class="bt1">STOP</strong>
                        </v-btn>
                        <v-row class="mt-n2">
<!--                            <v-col>-->
<!--                                <v-btn-->
<!--                                    class="z0 mt-5"-->
<!--                                    color="white"-->
<!--                                    x-large-->
<!--                                    block-->
<!--                                    outlined-->
<!--                                    raised-->
<!--                                    elevation="2"-->
<!--                                    @click="doSetOffset"-->
<!--                                    :disabled="!client.connected"-->
<!--                                >-->
<!--                                    <strong class="bt1">offset</strong>-->
<!--                                </v-btn>-->
<!--                            </v-col>-->
                            <v-col>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            class="z0 mt-5"
                                            color="white"
                                            x-large
                                            block
                                            outlined
                                            raised
                                            elevation="2"
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="changeAntType"
                                            :disabled="!client.connected"
                                        >
                                            <strong class="bt1">{{ antTypeMsg }}</strong>
                                        </v-btn>
                                    </template>
                                    <span>{{ antTypeMsg }}으로 변경</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
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
                            v-on="{
                                mousedown: panDown,
                                mouseup: panDownStop,
                                touchstart: panDown,
                                touchend: panDownStop,
                            }"
                            :disabled="!client.connected || !stop_flag"
                        >
                            <v-progress-linear
                                color="#FF00AA"
                                :height="150"
                                reverse
                                v-model="nPan"
                                style="pointer-events: none"
                            >
                                <template>
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
                            <v-col></v-col>
                            <v-col>
                                <p class="f2 font-weight-black">PAN</p>
                            </v-col>
                            <v-col>
                                <p class="f2 font-weight-black">{{ myPan }}</p>
                            </v-col>
                            <v-col></v-col>
                        </v-row>
                        <v-row>
                            <v-col></v-col>
                            <v-col>
                                <p class="f2 font-weight-black">TILT</p>
                            </v-col>
                            <v-col>
                                <p class="f2 font-weight-black">{{ myTilt }}</p>
                            </v-col>
                            <v-col></v-col>
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
                            v-on="{
                                mousedown: panUp,
                                mouseup: panUpStop,
                                touchstart: panUp,
                                touchend: panUpStop,
                            }"
                            :disabled="!client.connected || !stop_flag"
                        >
                            <v-progress-linear
                                color="#FF00AA"
                                :height="150"
                                v-model="pPan"
                                style="pointer-events: none"
                            >
                                <template>
                                    <strong class="bt1">P A N<br/><br/>U P</strong>
                                </template>
                            </v-progress-linear>
                        </v-btn>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <br/>
                    <v-card class="v1" outlined color="transparent">
                        <v-row>
                            <p class="f1aa mt-n5 font-weight-black" style="font-size: 15px">
                                HOST :
                            </p>
                        </v-row>
                        <v-row>
                            <v-text-field
                                class="text-white mt-n6"
                                v-model="connection.host"
                                :rules="host_rule"
                                label=""
                                color="white"
                            >
                            </v-text-field>
                        </v-row>
                        <v-row>
                            <p class="f1aa font-weight-black mt-n3" style="font-size: 15px">
                                GCS :
                            </p>
                        </v-row>
                        <v-row>
                            <v-text-field
                                class="text-white mt-n6"
                                v-model="connection.gcs"
                                :rules="gcs_rule"
                                label=""
                                color="white"
                            >
                            </v-text-field>
                        </v-row>
                        <v-row>
                            <p class="f1aa font-weight-black mt-n3" style="font-size: 15px">
                                DRONE :
                            </p>
                        </v-row>
                        <v-row>
                            <v-text-field
                                class="text-white mt-n6"
                                v-model="connection.drone"
                                :rules="drone_rule"
                                label=""
                                color="white"
                            >
                            </v-text-field>
                        </v-row>
                    </v-card>
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
                            v-on="{
                                mousedown: tiltDown,
                                mouseup: tiltDownStop,
                                touchstart: tiltDown,
                                touchend: tiltDownStop,
                            }"
                            :disabled="!client.connected || !stop_flag"
                        >
                            <v-progress-linear
                                color="#AAFF00"
                                :height="150"
                                v-model="nTilt"
                                style="pointer-events: none"
                            >
                                <template>
                                    <strong class="bt3">T I L T<br/><br/>D O W N</strong>
                                </template>
                            </v-progress-linear>
                        </v-btn>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="v1" outlined color="transparent">
                        <br/>
                        <v-row>
                            <v-row>
                                <p class="f1aa mt-n5 font-weight-black" style="font-size: 15px">
                                    Tracker Alt :
                                </p>
                                <p class="f1aa-1 mt-n2 font-weight-black" style="font-size: 15px">
                                    {{ curAlt }} m
                                </p>
                            </v-row>
                            <v-row>
                                <p class="f1aa font-weight-black" style="font-size: 15px">
                                    ALTITUDE :
                                </p>
                            </v-row>
                            <v-row>
                                <v-text-field
                                    class="text-white mt-n8 mb-n7"
                                    label=""
                                    color="white"
                                    v-model="tr_altitude"
                                    :rules="tr_altitude_rule"
                                >
                                </v-text-field>
                            </v-row>
                        </v-row>

                        <br/>
                        <p></p>
                        <v-row>
                            <v-col>
                                <v-btn
                                    class="z0"
                                    color="white"
                                    x-large
                                    block
                                    outlined
                                    raised
                                    elevation="2"
                                    @click="holdGPS"
                                    :disabled="gps_update || !client.connected"
                                >
                                    <strong class="bt1">HOLD</strong>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn
                                    class="z0"
                                    color="white"
                                    x-large
                                    block
                                    outlined
                                    raised
                                    elevation="2"
                                    @click="releaseGPS"
                                    :disabled="!gps_update || !client.connected"
                                >
                                    <strong class="bt1">Release</strong>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <v-row>
            <v-col>
                <v-btn
                    v-if="!client.connected"
                    class="bb"
                    color="white"
                    x-large
                    block
                    outlined
                    raised
                    elevation="2"
                    @click="setbtn"
                >
                    <strong class="bt1">connect</strong>
                </v-btn>
                <v-btn
                    v-if="client.connected"
                    class="bb"
                    color="white"
                    x-large
                    block
                    outlined
                    raised
                    elevation="2"
                    @click="destroyConnection"
                >
                    <strong class="bt1">disconnect</strong>
                </v-btn>
            </v-col>

            <!-- drone info start -->

            <v-col>
                <v-btn
                    class=""
                    color="white"
                    x-large
                    block
                    outlined
                    raised
                    elevation="2"
                    @click="show = !show"
                >
                    <strong class="bt1">Drone Information</strong>
                </v-btn>
            </v-col>
            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                :value="true"
                color="rgb(53, 53, 53)"
            >
                {{ text }}
            </v-snackbar>
        </v-row>

        <div>
            <v-card-actions>
                <v-row></v-row>
                <v-spacer></v-spacer>
            </v-card-actions>

            <br/>
            <v-card class="mx-auto" max-width="1300" color="transparent">
                <v-expand-transition>
                    <div v-show="show">
                        <v-card
                            class="pa-10 white--text"
                            outlined
                            shaped
                            elevation="3"
                            color="white"
                        >
                            <v-row>
                                <v-col>
                                    <p class="f0 font-weight-black">Drone Information</p>
                                </v-col>
                                <v-col cols=""></v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="">
                                    <v-text-field
                                        class="black--text"
                                        label="ID :"
                                        v-model="drone_info.id"
                                        :rules="id_rule"
                                        model-value=""
                                        prefix=" "
                                        color="black"
                                    ></v-text-field>

                                    <!-- 수정필요 approval gcs, v-model , rules-->
                                    <v-text-field
                                        class="text-black"
                                        label="APPROVAL GCS :"
                                        v-model="drone_info.approval_gcs"
                                        :rules="gcs_rule"
                                        model-value=""
                                        prefix=" "
                                        color="black"
                                    ></v-text-field>

                                    <v-text-field
                                        class="text-black"
                                        label="HOST :"
                                        v-model="drone_info.host"
                                        :rules="host_rule"
                                        model-value=""
                                        prefix=" "
                                        color="black"
                                    ></v-text-field>

                                    <v-text-field
                                        class="text-black"
                                        label="DRONE :"
                                        v-model="drone_info.drone"
                                        :rules="drone_rule"
                                        model-value=""
                                        prefix=" "
                                        color="black"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="">
                                    <v-text-field
                                        class="text-black"
                                        label="GCS :"
                                        v-model="drone_info.gcs"
                                        :rules="gcs_rule"
                                        model-value=""
                                        prefix=" "
                                        color="black"
                                    ></v-text-field>
                                    <v-text-field
                                        class="text-black"
                                        label="TYPE :"
                                        v-model="drone_info.type"
                                        :rules="type_rule"
                                        model-value=""
                                        prefix=" "
                                        color="black"
                                    ></v-text-field>
                                    <v-text-field
                                        class="text-black"
                                        label="SYSTEM ID :"
                                        v-model="drone_info.systemid"
                                        :rules="systemid_rule"
                                        model-value=""
                                        prefix=" "
                                        color="black"
                                    ></v-text-field>
                                    <v-text-field
                                        class="text-black"
                                        label="GCS IP :"
                                        v-model="drone_info.gcsip"
                                        :rules="gcsip_rule"
                                        model-value=""
                                        prefix=" "
                                        color="black"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <br/>
                            <v-row>
                                <v-col></v-col>
                                <v-col>
                                    <v-btn
                                        class="sb"
                                        x-large
                                        block
                                        outlined
                                        raised
                                        elevation="2"
                                        @click="savebtn"
                                    >
                                        <strong class="bt0">SAVE</strong>
                                    </v-btn>
                                </v-col>
                                <v-col></v-col>
                            </v-row>
                        </v-card>
                    </div>
                </v-expand-transition>
            </v-card>
            <br/>
        </div>
    </v-container>
</template>

<script>
import mqtt from "mqtt";
import {nanoid} from "nanoid";
import droneinfo from "@/assets/drone_info.json";

const data = droneinfo;

export default {
    name: "app",
    components: {},

    data() {
        return {
            show: false,
            selected: "",
            data,

            drone_info: localStorage.getItem("drone_info") ? JSON.parse(localStorage.getItem("drone_info")) : {
                id: "Mercury",
                approval_gcs: "",
                host: "121.137.228.240",
                drone: "KETI_AIoT_02",
                gcs: "KETI_MUV",
                type: "ardupilot",
                systemid: "202",
                gcsip: "192.168.202.150",
            },

            id_rule: [(v) => !!v || "ID 값은 필수 입력사항입니다."],
            drone_rule: [(v) => !!v || "drone 값은 필수 입력사항입니다."],
            host_rule: [(v) => !!v || "host 값은 필수 입력사항입니다."],
            gcs_rule: [(v) => !!v || "GCS 값은 필수 입력사항입니다."],
            type_rule: [(v) => !!v || "type 값은 필수 입력사항입니다."],
            systemid_rule: [(v) => !!v || "system ID 값은 필수 입력사항입니다."],
            gcsip_rule: [(v) => !!v || "GCS IP 값은 필수 입력사항입니다."],

            altset: "",
            altset_rule: [
                (v) => !!v || "고도값은 필수 입력사항입니다.",
                (v) => /^[0-9]*$/.test(v) || "고도값은 숫자만 입력 가능합니다.",
            ],

            interval: {},

            //location data
            loca_obj: {
                myLatitude: 37.403625,
                myLongitude: 127.16177,
                myAltitude: 0,
            },

            myPan: 0,
            myTilt: 0,

            p_offset: 0,
            t_offset: 0,

            pPan: 0,
            nPan: 0,

            pTilt: 0,
            nTilt: 0,

            // antTypeFlag: localStorage.getItem("antTypeFlag") ? localStorage.getItem("antTypeFlag") : false,
            // antTypeMsg: localStorage.getItem("antTypeMsg") ? localStorage.getItem("antTypeMsg") : 'T+90°',
            antTypeFlag: false,
            antTypeMsg: 'T90°',

            // mqtt 연결부
            client: {
                connected: false,
                loading: false,
            },
            connection: {
                host: localStorage.getItem("mobius-host") ? localStorage.getItem("mobius-host") : "",
                gcs: localStorage.getItem("mobius-gcs") ? localStorage.getItem("mobius-gcs") : "",
                drone: localStorage.getItem("mobius-drone") ? localStorage.getItem("mobius-drone") : "",
                port: 8883,
                endpoint: "",
                clean: true,
                reconnectPeriod: 2 * 1000,
                connectTimeout: 30 * 1000,
                queueQoSZero: false,
                clientId: "jiho_" + nanoid(15),
                username: "keti_muv",
                password: "keti_muv",
            },

            getDataTopic: {
                pantilt: "/Mobius/GcsName/Tr_Data/DroneName/pantilt"
            },

            motorControlTopic: "/Mobius/GcsName/Ctrl_Data/DroneName/Panel",
            offsetTopic: "/Mobius/GcsName/Offset_Data/DroneName/Panel",
            gpsControlTopic: "/Mobius/GcsName/Gps_Ctrl_Data/DroneName/Panel",
            altTopic: "/Mobius/GcsName/Alt_Data/DroneName/Panel",

            droneTopic: "/Mobius/GcsName/Drinfo_Data/Panel",

            console_text_message: "",
            chk: "",

            response_text: "",
            rev_connted: false,

            curAlt: null,
            tr_altitude: null,
            tr_altitude_rule: [
                v => /^[.0-9]*$/.test(v) || 'Only numbers.'
            ],

            snackbar: false,
            text: '',
            timeout: 3000,

            tr_state: '',
            gps_update: false,

            stop_flag: true,
            tr_run_status: false,
            tr_arrange_status: false,


        };
    },
    methods: {
        savebtn: function () {
            this.show = !this.show;
            console.log(JSON.stringify(this.drone_info));
            localStorage.setItem("drone_info", JSON.stringify(this.drone_info))
            this.doPublish(this.droneTopic, JSON.stringify(this.drone_info));
        },

        tiltUp: function () {
            this.doPublish(this.motorControlTopic, "tilt_up");
        },
        tiltUpStop: function () {
            this.doPublish(this.motorControlTopic, "stop");

            this.stop_flag = true;
        },
        tiltDown: function () {
            this.doPublish(this.motorControlTopic, "tilt_down");
        },
        tiltDownStop: function () {
            this.doPublish(this.motorControlTopic, "stop");

            this.stop_flag = true;
        },
        panDown: function () {
            this.doPublish(this.motorControlTopic, "pan_down");
        },
        panDownStop: function () {
            this.doPublish(this.motorControlTopic, "stop");

            this.stop_flag = true;
        },
        panUp: function () {
            this.doPublish(this.motorControlTopic, "pan_up");
        },
        panUpStop: function () {
            this.doPublish(this.motorControlTopic, "stop");

            this.stop_flag = true;
        },
        doRun: function () {
            this.tr_run_status = !this.tr_run_status;
            this.doPublish(this.motorControlTopic, "run");
            if (this.tr_run_status) {
                this.stop_flag = !this.tr_run_status;
            }
            else {
                this.stop_flag = !this.tr_run_status;
            }
        },
        doArrange: function () {
            this.tr_arrange_status = !this.tr_arrange_status;
            this.doPublish(this.motorControlTopic, "arrange");
            if (this.tr_arrange_status) {
                this.stop_flag = !this.tr_arrange_status;
            }
            else {
                this.stop_flag = !this.tr_arrange_status;
            }
        },
        doSetOffset: function () {
            this.doPublish(this.offsetTopic, JSON.stringify({
                p_offset: -1 * (this.p_offset),
                t_offset: -1 * (this.t_offset)
            }));
        },
        changeAntType: function () {
            this.antTypeFlag = !this.antTypeFlag;
            // localStorage.setItem("antTypeFlag", this.antTypeFlag);

            if (this.antTypeFlag) {
                this.antTypeMsg = 'T0°';
                this.doPublish(this.offsetTopic, JSON.stringify({type: 'T90'}));
            }
            else {
                this.antTypeMsg = 'T90°';
                this.doPublish(this.offsetTopic, JSON.stringify({type: "T0"}));
            }
            // localStorage.setItem("antTypeMsg", this.antTypeMsg);
        },
        setbtn: function () {
            // this.doPublish(this.altTopic, this.altset);
            localStorage.setItem("mobius-host", this.connection.host);
            localStorage.setItem("mobius-gcs", this.connection.gcs);
            localStorage.setItem("mobius-drone", this.connection.drone);

            this.createConnection();
        },
        holdGPS: function () {
            if (this.tr_altitude) {
                console.log('Hold GPS\n', 'Tracker Altitude -', this.tr_altitude + 'm');

                this.doPublish(this.gpsControlTopic, "hold," + this.tr_altitude);
                this.text = '고도를 ' + this.tr_altitude + 'm로 고정합니다.';
            }
            else {
                console.log('Hold GPS\n', 'Tracker Altitude is null');

                this.doPublish(this.gpsControlTopic, "hold," + this.curAlt);
                this.text = '현재 고도(' + this.curAlt + 'm)로 고정합니다.';
            }
            this.snackbar = true;
            this.gps_update = true;
        },
        releaseGPS: function () {
            console.log('Release GPS');
            this.doPublish(this.gpsControlTopic, "release");
            this.gps_update = false;
            this.text = 'GPS 고정을 해제합니다.';

            this.snackbar = true;
        },

        createConnection() {
            if (this.client.connected) {
                this.destroyConnection();
            }

            if (!this.client.connected) {
                this.client.loading = true;
                this.connection.clientId = "mqttjs_" + "jiho" + "_" + nanoid(15);

                this.getDataTopic.pantilt = "/Mobius/" + this.connection.gcs + "/Tr_Data/" + this.connection.drone + "/#";

                this.offsetTopic = "/Mobius/" + this.connection.gcs + "/Offset_Data/" + this.connection.drone + "/Panel";

                this.motorControlTopic = "/Mobius/" + this.connection.gcs + "/Ctrl_Data/" + this.connection.drone + "/Panel";
                this.altTopic = "/Mobius/" + this.connection.gcs + "/Alt_Data/" + this.connection.drone + "/Panel";
                this.droneTopic = "/Mobius/" + this.connection.gcs + "/Drinfo_Data/" + this.connection.drone + "/Panel";

                console.log("Host is : " + this.connection.host);
                const {host, port, endpoint, ...options} = this.connection;
                const connectUrl = `ws://${host}:${port}${endpoint}`;
                try {
                    this.client = mqtt.connect(connectUrl, options);

                    this.client.on("connect", () => {
                        console.log(connectUrl, "Connection succeeded!");

                        this.client.connected = true;
                        this.client.loading = false;

                        this.doSubscribe(this.getDataTopic.pantilt);

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
                        // console.log("Received " + message.toString() + " From " + topic);

                        let topic_arr = topic.split("/");
                        if (topic_arr[3] === "Tr_Data") {
                            // {
                            //     "pan_angle" : 359.8595441900111,
                            //     "tilt_angle" : -0.008266449886419495,
                            //     "flag_tracking" : "no",
                            //     "state" : "arranging",
                            //     "lat" : 37.4036621604629,
                            //     "lon" : 127.16176249708046,
                            //     "alt" : 0,
                            //     "relative_alt" : 0,
                            //     "fix_type" : 0,
                            //     "pan_offset" : 0,
                            //     "tilt_offset" : 0,
                            //     "gps_update" : true
                            // }
                            let TrData = JSON.parse(message.toString());
                            if (!this.gps_update) {
                                this.curAlt = TrData.alt;
                            }

                            this.myPan = parseInt(TrData.pan_angle).toFixed(1);
                            this.myTilt = parseInt(TrData.tilt_angle).toFixed(1);
                            this.tr_state = TrData.state.toString();
                            this.gps_update = JSON.parse(TrData.gps_update.toString());

                            this.myPan = parseInt(this.myPan);

                            if (this.myPan > 0) {
                                this.pPan = (this.myPan / 360) * 100;
                                this.pPan = parseInt(this.pPan);
                                this.nPan = 0;
                            }
                            else {
                                this.nPan = Math.abs(this.myPan);
                                this.nPan = (this.nPan / 360) * 100;
                                this.nPan = parseInt(this.nPan);
                                this.pPan = 0;
                            }

                            this.myTilt = parseInt(this.myTilt);

                            if (this.myTilt > 0) {
                                this.pTilt = (this.myTilt / 360) * 100;
                                this.pTilt = parseInt(this.pTilt);
                                this.nTilt = 0;
                            }
                            else {
                                this.nTilt = Math.abs(this.myTilt);
                                this.nTilt = (this.nTilt / 360) * 100;
                                this.nTilt = parseInt(this.nTilt);
                                this.pTilt = 0;
                            }
                        }
                    });
                }
                catch (error) {
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

        doPublish(topic, payload) {
            if (this.client.connected) {
                this.client.publish(topic, payload, 0, (error) => {
                    if (error) {
                        console.log("Publish error", error);
                    }
                });
                console.log('publish', topic, payload)
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
                    this.show = false;
                    this.rev_connted = false;
                    this.tr_run_status = false;
                    this.tr_arrange_status = false;
                    this.curAlt = null;
                    this.gps_update = false;
                    this.stop_flag = true;
                    this.myPan = 0;
                    this.myTilt = 0;
                    console.log(this.connection.host + " - " + this.connection.gcs, "\nSuccessfully disconnected!");
                }
                catch (error) {
                    console.log("Disconnect failed", error.toString());
                }
            }
        },
    },
    created() {
        // this.createConnection();
    },

    mounted() {
        this.interval = setInterval(() => {
            if (this.value === 100) {
                return (this.value = 0);
            }
            this.value += 10;
        }, 2000);
    },
    beforeDestroy() {
        this.destroyConnection();
    },
};
</script>

<style lang="scss">
#app {
    text-align: center;
    color: white;
    background: rgb(53, 53, 53);
    display: flex;
    justify-content: center;
    align-items: center;
}

.text-white input {
    border-color: white;
    text-align: center;
    font-size: 25px;
    letter-spacing: 5px;
    color: white !important;
}

.f0 {
    text-align: left;
    color: black;
    letter-spacing: 3px;
    font-size: 20px;
}

.f1 {
    text-align: center;
    color: white;
    letter-spacing: 5px;
    font-size: 20px;
}

.f1aa {
    text-align: start;
    color: white;
    letter-spacing: 5px;
    font-size: 13px;
}

.f1aa-1 {
    text-align: end;
    color: white;
    letter-spacing: 5px;
    font-size: 13px;
}

.f1ab {
    text-align: start;
    color: white;
    letter-spacing: 5px;
    font-size: 10px;
}

.f1b {
    text-align: center;
    color: white;
    letter-spacing: 5px;
    font-size: 18px;
}

.f2 {
    text-align: center;
    color: white;
    letter-spacing: 8px;
    font-size: 20px;
}

.f3 {
    text-align: center;
    color: white;
    letter-spacing: 3px;
    font-size: 25px;
}

.f4 {
    text-align: center;
    color: white;
    letter-spacing: 3px;
    font-size: 32px;
}

.bt0 {
    text-align: center;
    color: black;
    letter-spacing: 2px;
    font-size: 15px;
}

.bt1 {
    text-align: center;
    color: white;
    letter-spacing: 2px;
    font-size: 15px;
}

.bt2 {
    text-align: center;
    color: white;
    letter-spacing: 2px;
    font-size: 15px;
    transform: rotate(90deg);
}

.bt3 {
    text-align: center;
    color: white;
    letter-spacing: 2px;
    font-size: 15px;
    transform: rotate(270deg);
}

.b0 {
    width: 100px;
    min-width: 100px;
    height: 50px;
    min-height: 50px;
    letter-spacing: 2px;
}

.z0 {
    width: 50px;
    min-width: 50px;
    height: 50px;
    min-height: 50px;
    letter-spacing: 2px;
}

.b0d {
    width: 100px;
    min-width: 100px;
    height: 44px;
    min-height: 44px;
    letter-spacing: 2px;
}

.b0a {
    width: 100px;
    min-width: 100px;
    height: 88px;
    letter-spacing: 2px;
}

.bb {
    width: 50px;
    min-width: 50px;
    height: 50px;
    min-height: 50px;
}

.sb {
    color: black;
    width: 50px;
    min-width: 50px;
    height: 50px;
    min-height: 50px;
}

.b1 {
    width: 170px;
    min-width: 170px;
    height: 200px;
    min-height: 200px;
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

.v-text-field input {
    font-size: 15px;
}
</style>
