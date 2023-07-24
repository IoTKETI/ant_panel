<template>
    <v-app>
        <Header></Header>
        <Ant></Ant>
<!--        <router-view/>-->
    </v-app>
</template>

<script>
import Header from './layout/Header';
import Ant from './components/ant';

export default {
    name: 'App',
    components: {
        Header,
        Ant
    },

    data: () => ({}),
};
</script>





