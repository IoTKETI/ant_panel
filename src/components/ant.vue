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
                            :disabled="!client.connected || tr_state === 'arranging' || tr_state === 'run'"
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
                            :disabled="!client.connected || tr_state === 'arranging'"
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
                            :disabled="!client.connected || tr_state === 'arranging'"
                        >
                            <strong class="bt1">STOP</strong>
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
                            :disabled="!client.connected || tr_state === 'run'"
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
                            :disabled="!client.connected || tr_state === 'run'"
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
                            <!--                            <v-col>-->
                            <!--                                <v-tooltip bottom>-->
                            <!--                                    <template v-slot:activator="{ on, attrs }">-->
                            <!--                                        <v-btn-->
                            <!--                                            class="z0 mt-5"-->
                            <!--                                            color="white"-->
                            <!--                                            x-large-->
                            <!--                                            block-->
                            <!--                                            outlined-->
                            <!--                                            raised-->
                            <!--                                            elevation="2"-->
                            <!--                                            v-bind="attrs"-->
                            <!--                                            v-on="on"-->
                            <!--                                            @click="changeAntType"-->
                            <!--                                            :disabled="!client.connected"-->
                            <!--                                        >-->
                            <!--                                            <strong class="bt1">{{ antTypeMsg }}</strong>-->
                            <!--                                        </v-btn>-->
                            <!--                                    </template>-->
                            <!--                                    <span>{{ antTypeMsg }}으로 변경</span>-->
                            <!--                                </v-tooltip>-->
                            <!--                            </v-col>-->
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
                            :disabled="!client.connected || tr_state === 'arranging' || tr_state === 'run'"
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
                    <v-card class="v1" outlined color="transparent" style="height: 100px">
                        <v-row class="mt-n3" justify="center">
                            <v-col cols="5.5">
                                <p class="f2 font-weight-black">PAN</p>
                            </v-col>
                            <v-col>
                                <p class="f2 font-weight-black">{{ myPan }}</p>
                            </v-col>
                        </v-row>
                        <v-row class="mt-n6" justify="center">
                            <v-col cols="5.5">
                                <p class="f2 font-weight-black">TILT</p>
                            </v-col>
                            <v-col>
                                <p class="f2 font-weight-black">{{ myTilt }}</p>
                            </v-col>
                        </v-row>
                        <v-row class="mt-n6" justify="center">
                            <v-col cols="5.5">
                                <p class="f2 font-weight-black">ALT</p>
                            </v-col>
                            <v-col>
                                <p class="f2 font-weight-black">{{ curAlt }}m</p>
                            </v-col>
                        </v-row>
                        <v-row class="mt-n6" justify="center" align="center">
                            <v-col cols="5.5">
                                <p class="f2 font-weight-black">GPS</p>
                            </v-col>
                            <v-col>
                                <v-row>
                                    <p class="f2 font-weight-black" style="letter-spacing:2px">{{ gps_fixed }}</p>
                                </v-row>
                                <v-row class="mt-n3">
                                    <p class="f2 font-weight-black" style="letter-spacing:2px">{{ gps_update }}</p>
                                </v-row>
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
                            v-on="{
                                mousedown: panUp,
                                mouseup: panUpStop,
                                touchstart: panUp,
                                touchend: panUpStop,
                            }"
                            :disabled="!client.connected || tr_state === 'arranging' || tr_state === 'run'"
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
                            :disabled="!client.connected || tr_state === 'arranging' || tr_state === 'run'"
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
                        <v-row class="">
                            <v-row>
                                <p class="f1aa mt-n6 font-weight-black" style="font-size: 15px; letter-spacing: 4px">
                                    Antenna Type :
                                </p>
                                <p class="f1aa-1 mt-n4 font-weight-black" style="font-size: 15px">
                                    {{ ant_type }}
                                </p>
                            </v-row>
                            <v-row>
                                <p class="f1aa mt-n3 font-weight-black" style="font-size: 15px; letter-spacing: 4px">
                                    Motor Speed :
                                </p>
                                <p class="f1aa-1 mt-n4 font-weight-black" style="font-size: 15px">
                                    {{ motorSpeed }}
                                </p>
                            </v-row>
                            <v-row>
                                <p class="f1aa mt-n3 font-weight-black" style="font-size: 15px; letter-spacing: 4px">
                                    Offset Alt :
                                </p>
                                <p class="f1aa-1 mt-n4 font-weight-black" style="font-size: 15px">
                                    {{ tr_offset_alt }}m
                                </p>
                            </v-row>
                            <!--                            <v-row>-->
                            <!--                                <p class="f1aa font-weight-black" style="font-size: 15px">-->
                            <!--                                    ALTITUDE :-->
                            <!--                                </p>-->
                            <!--                            </v-row>-->
                            <!--                            <v-row>-->
                            <!--                                <v-text-field-->
                            <!--                                    class="text-white mt-n8 mb-n7"-->
                            <!--                                    label=""-->
                            <!--                                    color="white"-->
                            <!--                                    v-model="tr_offset_alt"-->
                            <!--                                    :rules="tr_offset_alt_rule"-->
                            <!--                                >-->
                            <!--                                </v-text-field>-->
                            <!--                            </v-row>-->
                        </v-row>

                        <p></p>
                        <v-row class="justify-end pr-3 mt-n3" justify="space-between">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="white"
                                        outlined
                                        raised
                                        width="90"
                                        height="50"
                                        elevation="2"
                                        @click="connectMAVLink"
                                        :disabled="!client.connected"
                                        v-bind="attrs"
                                        v-on="on"
                                        style="text-transform: unset"
                                    >
                                        MAVLink
                                    </v-btn>
                                </template>
                                Connect MAVLink
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="white"
                                        outlined
                                        raised
                                        width="20"
                                        height="50"
                                        elevation="2"
                                        @click="dialog=true"
                                        :disabled="!client.connected"
                                        v-bind="attrs"
                                        v-on="on">
                                        <v-icon
                                            color="white"
                                            size="30"
                                        >$cogTransfer
                                        </v-icon>
                                    </v-btn>
                                </template>
                                Settings
                            </v-tooltip>
                        </v-row>

                        <!--                            <v-col>-->
                        <!--                                <v-btn-->
                        <!--                                    class="z0"-->
                        <!--                                    color="white"-->
                        <!--                                    x-large-->
                        <!--                                    block-->
                        <!--                                    outlined-->
                        <!--                                    raised-->
                        <!--                                    elevation="2"-->
                        <!--                                    @click="holdGPS"-->
                        <!--                                    :disabled="gps_update || !client.connected"-->
                        <!--                                >-->
                        <!--                                    <strong class="bt1">HOLD</strong>-->
                        <!--                                </v-btn>-->
                        <!--                            </v-col>-->
                        <!--                            <v-col>-->
                        <!--                                <v-btn-->
                        <!--                                    class="z0"-->
                        <!--                                    color="white"-->
                        <!--                                    x-large-->
                        <!--                                    block-->
                        <!--                                    outlined-->
                        <!--                                    raised-->
                        <!--                                    elevation="2"-->
                        <!--                                    @click="releaseGPS"-->
                        <!--                                    :disabled="!gps_update || !client.connected"-->
                        <!--                                >-->
                        <!--                                    <strong class="bt1">Release</strong>-->
                        <!--                                </v-btn>-->
                        <!--                            </v-col>-->
                    </v-card>
                </v-col>
            </v-row>
            <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                :value="true"
                color="rgb(53,53,53)"
            >
                {{ text }}
            </v-snackbar>
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
        </v-row>

        <v-dialog
            v-model="dialog"
            max-width="450"
            dark
        >
            <v-card class="pa-6 pl-1 pb-2">
                <v-card-title class="ml-n1 mt-n6 mr-n6" style="background-color: #353535; height: 50px;">
                    <span class="headline white--text mt-n2">Settings</span>
                </v-card-title>
                <v-row no-gutters align="center" justify="center" class="mt-7">
                    <v-col cols="6">
                        <v-row no-gutters align="center" justify="center" style="height: 60px">
                            <p class="f1aa font-weight-black text-end" style="font-size: 15px">
                                antenna TYPE :
                            </p>
                        </v-row>
                        <v-row no-gutters align="center" justify="center" style="height: 60px">
                            <p class="f1aa font-weight-black text-end" style="font-size: 15px">
                                OFFSET ALT :
                            </p>
                        </v-row>
                        <v-spacer/>
                        <v-row no-gutters align="center" justify="center" style="height: 60px">
                            <p class="f1aa font-weight-black text-end" style="font-size: 15px">
                                GPS HOLD :
                            </p>
                        </v-row>
                        <v-row no-gutters align="center" justify="center" style="height: 60px">
                            <p class="f1aa font-weight-black text-end" style="font-size: 15px">
                                Motor speed :
                            </p>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row no-gutters align="center" justify="center" class="mt-n5">
                            <v-col cols="8">
                                <v-btn
                                    class="z1"
                                    color="white"
                                    x-large
                                    outlined
                                    raised
                                    elevation="2"
                                    @click="changeAntType"
                                    :disabled="!client.connected">
                                    <strong class="bt1">{{ antTypeMsg }}</strong>
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            class="z1"
                                            color="white"
                                            outlined
                                            raised
                                            elevation="2"
                                            @click="changeAntType"
                                            :disabled="!client.connected"
                                            v-bind="attrs"
                                            v-on="on">
                                            <v-icon>$reload</v-icon>
                                        </v-btn>
                                    </template>
                                    Change antenna type to "{{ antTypeMsg }}"
                                </v-tooltip>
                            </v-col>
                        </v-row>
                        <v-row no-gutters align="center" justify="center">
                            <v-col cols="7">
                                <v-text-field
                                    class="text-white mr-2 centered-input"
                                    label=""
                                    color="white"
                                    v-model="offset_alt"
                                    :rules="offset_alt_rule"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="1">
                                <p class="font-weight-black mt-3 ml-n4" style="font-size: 13px">
                                    m
                                </p>
                            </v-col>
                            <v-col cols="4">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            class="z1"
                                            color="white"
                                            outlined
                                            raised
                                            elevation="2"
                                            @click="changeOffsetAlt"
                                            :disabled="!client.connected"
                                            v-bind="attrs"
                                            v-on="on"
                                            style="text-transform: unset"
                                        >
                                            <v-icon>$forward</v-icon>
                                        </v-btn>
                                    </template>
                                    오프셋 고도를 {{ offset_alt }}로 변경
                                </v-tooltip>
                            </v-col>
                        </v-row>
                        <v-row no-gutters align="center" justify="center">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        v-if="gps_update === 'RELEASE'"
                                        class="z1"
                                        color="white"
                                        x-large
                                        outlined
                                        raised
                                        elevation="2"
                                        @click="holdGPS"
                                        :disabled="!client.connected"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <strong class="bt1">HOLD</strong>
                                    </v-btn>
                                </template>
                                Change to GPS Hold
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        v-if="gps_update === 'HOLD'"
                                        class="z1"
                                        color="white"
                                        x-large
                                        outlined
                                        raised
                                        elevation="2"
                                        @click="releaseGPS"
                                        :disabled="!client.connected"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <strong class="bt1">Release</strong>
                                    </v-btn>
                                </template>
                                Change to GPS Release
                            </v-tooltip>
                        </v-row>
                        <v-row no-gutters align="center" justify="center">
                            <v-col cols="8">
                                <v-text-field
                                    class="centered-input text-white mr-2"
                                    label=""
                                    color="white"
                                    v-model="tr_speed"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            class="z1"
                                            color="white"
                                            outlined
                                            raised
                                            elevation="2"
                                            @click="changeSpeed"
                                            :disabled="!client.connected"
                                            v-bind="attrs"
                                            v-on="on"
                                            style="text-transform: unset"
                                        >
                                            {{ mSpeedMsg.toLowerCase() }}
                                        </v-btn>
                                    </template>
                                    모터 속도를 {{ speedCount + 1 }}배속({{ (parseFloat(tr_speed) + 8.88).toFixed(2) }})으로 변경
                                </v-tooltip>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row no-gutters align="center" justify="space-between" class="mb-n3">
                    <v-col cols="3">
                        <v-card-actions>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="primary"
                                        text tile
                                        @click="dr_info_dialog = true"
                                        v-on:keyup.esc="dr_info_dialog = true"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>$clipboardeditoutline</v-icon>
                                    </v-btn>
                                </template>
                                Edit drone information
                            </v-tooltip>
                        </v-card-actions>
                    </v-col>
                    <v-col cols="3">
                        <v-card-actions>
                            <v-btn
                                color="primary"
                                text tile
                                @click="dialog = false"
                                v-on:keyup.esc="dialog = false"
                            >
                                CLOSE
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>


        <v-dialog
            v-model="dr_info_dialog"
            max-width="700"
            dark
        >
            <v-card
                class="pa-10 black--text"
                outlined
                shaped
                elevation="3"
                color="#535353"
            >
                <v-row>
                    <v-col>
                        <p class="f0" style="color:white">Drone Information</p>
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
                            <strong class="bt0" style="color:white">SAVE</strong>
                        </v-btn>
                    </v-col>
                    <v-col></v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import mqtt from "mqtt";
import {nanoid} from "nanoid";
import droneinfo from "@/assets/drone_info.json";
import mavlink from '../js/mavlink'
import dgram from "dgram";

const data = droneinfo;

export default {
    name: "app",
    components: {},

    data() {
        return {
            data,

            drone_info: localStorage.getItem("drone_info") ? JSON.parse(localStorage.getItem("drone_info")) : {
                id: "UA",
                approval_gcs: "MUV",
                host: "gcs.iotocean.org",
                drone: "KETI_Simul_1",
                gcs: "KETI_GCS",
                type: "ardupilot",
                systemid: "105",
                gcsip: "192.168.105.150",
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

            myPan: 0,
            myTilt: 0,

            p_offset: 0,
            t_offset: 0,

            pPan: 0,
            nPan: 0,

            pTilt: 0,
            nTilt: 0,

            antTypeFlag: false,
            antTypeMsg: '',

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

            tr_client: {
                connected: false,
                loading: false,
            },
            tr_connection: {
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
            getDroneDataTopic: "/Mobius/GcsName/Drone_Data/DroneName/Panel",
            TrCmdDataTopic: "/Mobius/GcsName/TrCmd_Data/DroneName/Panel",

            getDataTopic: {
                pantilt: "/Mobius/GcsName/Tr_Data/DroneName/pantilt"
            },

            motorControlTopic: "/Mobius/GcsName/Ctrl_Data/DroneName/Panel",
            offsetTopic: "/Mobius/GcsName/Offset_Data/DroneName/Panel",
            gpsControlTopic: "/Mobius/GcsName/Gps_Ctrl_Data/DroneName/Panel",
            altTopic: "/Mobius/GcsName/Alt_Data/DroneName/Panel",
            speedTopic: "/Mobius/GcsName/Speed_Data/DroneName/Panel",

            droneTopic: "/Mobius/GcsName/Drinfo_Data/Panel",

            curAlt: 0,
            offset_alt: 0.5,
            offset_alt_rule: [
                v => /^[.0-9]*$/.test(v) || 'Only numbers.'
            ],

            snackbar: false,
            text: '',
            timeout: 3000,

            tr_state: 'ready',
            gps_update: 'RELEASE',
            ant_type: "T0",
            gps_fixed: "No GPS",

            tr_run_status: false,
            tr_arrange_status: false,

            mavlink_connect: false,

            tr_offset_alt: 0.5,
            motorSpeed: 0,
            tr_speed: 8.88,
            speedCount: 1,

            arrangeBtnMsg: 'ARRANGE',
            runBtnMsg: 'RUN',
            mSpeedMsg: '1x',

            dialog: false,
            dr_info_dialog: false,

            mavUdpComLink: {},
        };
    },
    methods: {
        savebtn() {
            console.log(JSON.stringify(this.drone_info));
            localStorage.setItem("drone_info", JSON.stringify(this.drone_info))
            this.doPublish(this.droneTopic, JSON.stringify(this.drone_info));
        },

        tiltUp() {
            this.doPublish(this.motorControlTopic, "tilt_up");
        },
        tiltUpStop() {
            this.doPublish(this.motorControlTopic, "stop");
        },
        tiltDown() {
            this.doPublish(this.motorControlTopic, "tilt_down");
        },
        tiltDownStop() {
            this.doPublish(this.motorControlTopic, "stop");
        },
        panDown() {
            this.doPublish(this.motorControlTopic, "pan_down");
        },
        panDownStop() {
            this.doPublish(this.motorControlTopic, "stop");
        },
        panUp() {
            this.doPublish(this.motorControlTopic, "pan_up");
        },
        panUpStop() {
            this.doPublish(this.motorControlTopic, "stop");
        },
        doRun() {
            this.doPublish(this.motorControlTopic, "run");
        },
        doArrange() {
            this.doPublish(this.motorControlTopic, "arrange");
        },
        doSetOffset() {
            this.doPublish(this.offsetTopic, JSON.stringify({
                p_offset: -1 * (this.p_offset), t_offset: -1 * (this.t_offset)
            }));
        },
        changeAntType() {
            this.antTypeFlag = !this.antTypeFlag;

            if (this.antTypeFlag) {
                this.antTypeMsg = 'T0°';
                this.doPublish(this.offsetTopic, JSON.stringify({type: 'T90'}));
            }
            else {
                this.antTypeMsg = 'T90°';
                this.doPublish(this.offsetTopic, JSON.stringify({type: "T0"}));
            }
        },
        setbtn() {
            localStorage.setItem("mobius-host", this.connection.host);
            localStorage.setItem("mobius-gcs", this.connection.gcs);
            localStorage.setItem("mobius-drone", this.connection.drone);

            this.createConnection();
        },
        changeSpeed() {
            this.speedCount++;
            if (this.speedCount > 5) {
                this.speedCount = 1;
            }
            this.tr_speed = (8.88 * this.speedCount).toFixed(2);
            this.mSpeedMsg = this.speedCount.toString() + 'x';

            this.doPublish(this.speedTopic, this.tr_speed.toString());
        },
        changeOffsetAlt() {
            this.doPublish(this.altTopic, this.offset_alt);
        },
        holdGPS() {
            this.doPublish(this.gpsControlTopic, "hold");
        },
        releaseGPS() {
            console.log('Release GPS');
            this.doPublish(this.gpsControlTopic, "release");
            this.text = 'GPS 고정을 해제합니다.';

            this.snackbar = true;
            setTimeout(() => {
                this.snackbar = false;
            }, 3000);
        },
        createConnection() {
            if (this.client.connected) {
                this.destroyConnection();
            }

            if (!this.client.connected) {
                this.client.loading = true;
                this.connection.clientId = "mqttjs_" + "jiho" + "_" + nanoid(15);

                this.getDataTopic.pantilt = "/Mobius/" + this.connection.gcs + "/Tr_Data/" + this.connection.drone + "/pantilt";

                this.offsetTopic = "/Mobius/" + this.connection.gcs + "/Offset_Data/" + this.connection.drone + "/Panel";

                this.motorControlTopic = "/Mobius/" + this.connection.gcs + "/Ctrl_Data/" + this.connection.drone + "/Panel";
                this.altTopic = "/Mobius/" + this.connection.gcs + "/Alt_Data/" + this.connection.drone + "/Panel";
                this.speedTopic = "/Mobius/" + this.connection.gcs + "/Speed_Data/" + this.connection.drone + "/Panel";
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
                            console.log(message.toString())
                            let TrData = JSON.parse(message.toString());
                            if (this.gps_update === "RELEASE") {
                                this.curAlt = TrData.alt;
                            }

                            this.myPan = TrData.pan_angle.toFixed(1);
                            this.myTilt = TrData.tilt_angle.toFixed(1);
                            this.tr_offset_alt = TrData.offset_alt.toFixed(1);

                            this.tr_state = TrData.state.toString();
                            if (this.tr_state === 'arranging') {
                                this.arrangeBtnMsg === 'STOP';
                                this.tr_arrange_status = true;
                            }
                            else if (this.tr_state === 'run') {
                                this.runBtnMsg === 'STOP';
                                this.tr_run_status = true;
                            }
                            else {
                                this.arrangeBtnMsg === 'ARRANGE';
                                this.runBtnMsg === 'RUN';
                                this.tr_arrange_status = false;
                                this.tr_run_status = false;
                            }

                            let motor_speed = parseFloat(TrData.speed).toFixed(2);
                            if (this.motorSpeed !== motor_speed) {
                                this.motorSpeed = motor_speed;
                            }
                            if (JSON.parse(TrData.gps_update.toString())) {
                                this.gps_update = 'RELEASE';
                            }
                            else {
                                this.gps_update = "HOLD";
                            }

                            let fix_type = parseInt(TrData.fix_type);
                            if (fix_type === mavlink.GPS_FIX_TYPE_NO_GPS) {//0 // No GPS connected
                                this.gps_fixed = 'NO_GPS';
                            }
                            else if (fix_type === mavlink.GPS_FIX_TYPE_NO_FIX) {//1 // No position information, GPS is connected
                                this.gps_fixed = 'NO_FIX';
                            }
                            else if (fix_type === mavlink.GPS_FIX_TYPE_2D_FIX) {//2 // 2D position
                                this.gps_fixed = '2D_FIX';
                            }
                            else if (fix_type === mavlink.GPS_FIX_TYPE_3D_FIX) {//3 // 3D position
                                this.gps_fixed = '3D_FIX';
                            }
                            else if (fix_type === mavlink.GPS_FIX_TYPE_DGPS) {//4 // DGPS/SBAS aided 3D position
                                this.gps_fixed = 'DGPS';
                            }
                            else if (fix_type === mavlink.GPS_FIX_TYPE_RTK_FLOAT) {//5 // RTK float, 3D position
                                this.gps_fixed = 'RTK_FLOAT';
                            }
                            else if (fix_type === mavlink.GPS_FIX_TYPE_RTK_FIXED) {//6 // RTK Fixed, 3D position
                                this.gps_fixed = 'RTK_FIXED';
                            }
                            else if (fix_type === mavlink.GPS_FIX_TYPE_STATIC) {//7 // Static fixed, typically used for base stations
                                this.gps_fixed = 'STATIC';
                            }
                            else if (fix_type === mavlink.GPS_FIX_TYPE_PPP) {//8 // PPP, 3D position.
                                this.gps_fixed = 'PPP';
                            }
                            else if (fix_type === mavlink.GPS_FIX_TYPE_ENUM_END) {//9 //
                                this.gps_fixed = 'ENUM_END';
                            }

                            this.ant_type = TrData.ant_type.toString();
                            if (this.ant_type === 'T0') {
                                this.antTypeMsg = 'T90°';
                            }
                            else if (this.ant_type === 'T90') {
                                this.antTypeMsg = 'T0°';
                            }

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

                    this.mavUdpComLink[this.connection.drone].socket.close();

                    this.tr_run_status = false;
                    this.tr_arrange_status = false;
                    this.curAlt = 0;
                    this.offset_alt = 0;
                    this.tr_state = 'ready';
                    this.gps_update = 'RELEASE';
                    this.ant_type = "T0";
                    this.gps_fixed = "No GPS";
                    this.myPan = 0;
                    this.myTilt = 0;
                    this.tr_speed = 0;
                    this.motorSpeed = 8.88 * 4;
                    this.arrangeBtnMsg = "ARRANGE";
                    this.runBtnMsg = "RUN";
                    this.mavlink_connect = false;
                    this.dialog = false;
                    this.dr_info_dialog = false;
                    this.mavUdpComLink = {};
                    console.log(this.connection.host + " - " + this.connection.gcs, "\nSuccessfully disconnected!");
                }
                catch (error) {
                    console.log("Disconnect failed", error.toString());
                }
            }
        },

        connectMAVLink() {
            this.mavlink_connect = !this.mavlink_connect;
            if (this.mavlink_connect) {
                this.tr_createConnection();
            }
            else {
                if (Object.prototype.hasOwnProperty.call(this.mavUdpComLink, this.connection.drone)) {
                    this.mavUdpComLink[this.connection.drone].socket.close();
                }
                this.tr_destroyConnection();
            }
        },
        createUdpCommLink(dName, port) {
            if (!Object.prototype.hasOwnProperty.call(this.mavUdpComLink, dName)) {
                let udpSocket = dgram.createSocket('udp4');

                udpSocket.id = dName;

                this.mavUdpComLink[dName] = {};
                this.mavUdpComLink[dName].socket = udpSocket;
                this.mavUdpComLink[dName].port = port;

                console.log('UDP socket created on port ' + port + ' [' + dName + ']');

                udpSocket.on('message', (msg) => {
                    this.tr_doPublish(this.TrCmdDataTopic, msg)
                });

                udpSocket.on('close', () => {
                    console.log('close');

                    if (Object.prototype.hasOwnProperty.call(this.mavUdpComLink, this.id)) {
                        delete this.mavUdpComLink[this.id];
                    }
                });
            }
        },
        tr_createConnection() {
            if (this.tr_client.connected) {
                this.tr_destroyConnection();
            }

            if (!this.tr_client.connected) {
                this.tr_client.loading = true;
                this.tr_connection.clientId = "mqttjs_" + "tr_" + nanoid(15);

                this.getDroneDataTopic = "/Mobius/" + this.connection.gcs + "/Drone_Data/" + this.connection.drone + "/Panel";
                this.TrCmdDataTopic = "/Mobius/" + this.connection.gcs + "/TrCmd_Data/" + this.connection.drone + "/Panel";

                console.log("Tracker host is : " + this.connection.host);
                if (this.connection.host.includes('192.168.')) {
                    this.createUdpCommLink(this.connection.drone, 11000 + 254);

                    const {host, port, endpoint, ...options} = this.tr_connection;
                    const connectUrl = `ws://${host}:${port}${endpoint}`;
                    try {
                        this.tr_client = mqtt.connect(connectUrl, options);

                        this.tr_client.on("connect", () => {
                            console.log(connectUrl, "Connection succeeded!");

                            this.tr_client.connected = true;
                            this.tr_client.loading = false;

                            this.tr_doSubscribe(this.getDroneDataTopic);
                        });

                        this.tr_client.on("error", (error) => {
                            console.log("tr_Connection failed", error);

                            this.tr_destroyConnection();
                        });

                        this.tr_client.on("close", () => {
                            console.log("tr_Connection closed");

                            this.tr_destroyConnection();

                            this.tr_connection.clientId = "mqttjs_" + "tr_" + nanoid(15);
                        });

                        this.tr_client.on("message", (topic, message) => {
                            // console.log("Received " + message.toString() + " From " + topic);

                            let topic_arr = topic.split("/");
                            if (topic_arr[3] === "Drone_Data") {
                                if (Object.prototype.hasOwnProperty.call(this.mavUdpComLink, topic_arr[4])) {
                                    this.mavUdpComLink[topic_arr[4]].socket.send(message, this.mavUdpComLink[topic_arr[4]].port, 'localhost', (error) => {
                                        if (error) {
                                            this.mavUdpComLink[topic_arr[4]].socket.close();
                                            console.log('udpCommLink[' + topic_arr[4] + '].socket is closed');
                                        }
                                    });
                                }
                            }
                        });
                    }
                    catch (error) {
                        console.log("tr_mqtt.connect error", error);
                        this.tr_client.connected = false;

                        setTimeout(this.tr_createConnection, 2000);
                    }
                }
                else {
                    this.text = '트래커와 이더넷으로 연결하세요.';
                    this.snackbar = true;
                    setTimeout(() => {
                        this.snackbar = false;
                    }, 3000);
                }
            }
        },

        tr_doSubscribe(topic) {
            if (this.tr_client.connected) {
                const qos = 0;
                this.tr_client.subscribe(topic, {qos}, (error) => {
                    if (error) {
                        console.log("tr_Subscribe to topics error", error);
                        return;
                    }

                    console.log("tr_Subscribe to topics (", topic, ")");
                });
            }
        },

        tr_doPublish(topic, payload) {
            if (this.tr_client.connected) {
                this.tr_client.publish(topic, payload, 0, (error) => {
                    if (error) {
                        console.log("tr_Publish error", error);
                    }
                });
                console.log('tr_publish', topic, payload)
            }
        },

        tr_destroyConnection() {
            if (this.tr_client.connected) {
                try {
                    if (Object.hasOwnProperty.call(this.tr_client, "__ob__")) {
                        this.tr_client.end();
                    }
                    this.tr_client = {
                        connected: false,
                        loading: false,
                    };
                    console.log(this.tr_connection.host + " - " + this.tr_connection.gcs, "\nSuccessfully tr_disconnected!");
                }
                catch (error) {
                    console.log("tr_Disconnect failed", error.toString());
                }
            }
        },
    },
    watch: {
        motorSpeed(nVal) {
            this.tr_speed = nVal;
            this.speedCount = Math.round(nVal / 8.88);
            this.mSpeedMsg = this.speedCount.toString() + 'x';
        },
        tr_speed(nVal) {
            this.speedCount = Math.round(nVal / 8.88);
            this.mSpeedMsg = this.speedCount.toString() + 'x';
        }
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
    height: 88.5px;
    min-height: 88.5px;
    letter-spacing: 2px;
}

.z0 {
    width: 50px;
    min-width: 50px;
    height: 50px;
    min-height: 50px;
    letter-spacing: 2px;
}

.z1 {
    width: 30px;
    min-width: 30px;
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

.centered-input input {
    text-align: end
}
</style>
