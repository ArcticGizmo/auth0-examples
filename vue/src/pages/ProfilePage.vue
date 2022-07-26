<template>
  <div class="profile-page">
    <strong>Welcome to to the profile page. This is everything we know about you</strong>
    <pre>{{ user }}</pre>
    <br />

    <div>Select your organization to use its access token</div>
    <div class="organizations">
      <OrgCard
        v-for="(org, index) in orgs"
        :key="index"
        :class="{ selected: org.id === idTokenClaims.org_id }"
        :org="org"
        @click="onChangeOrg(org.id)"
      />
    </div>

    <div>Claims</div>
    <pre>{{ idTokenClaims }}</pre>
    <br />
    <div>Token</div>
    <code>{{ token }}</code>
  </div>
</template>

<script setup>
import { useAuth0 } from '@auth0/auth0-vue';
import { ref } from 'vue';
import API from '@/code/api';
import OrgCard from '@/components/OrgCard.vue';
import AuthClient from '@/code/auth_client.js';

const { user, idTokenClaims, getAccessTokenSilently, loginWithRedirect } = useAuth0();

const NONE_ORG = {
  branding: {
    logo_url: null,
  },
  display_name: 'None',
  id: undefined,
  name: null,
};

const token = ref(null);
const orgs = ref([]);

getAccessTokenSilently()
  .then(resp => (token.value = resp))
  .catch(error => console.error(error));

API.getUserOrganizations()
  .then(resp => {
    resp.unshift(NONE_ORG);
    orgs.value = resp;
  })
  .catch(e => {
    console.error('Could not get organizations at this time');
  });

const onChangeOrg = async orgId => {
  if (!orgId) {
    loginWithRedirect();
    return;
  }

  const opts = { organization: orgId, ignoreCache: true };

  const newToken = await getAccessTokenSilently(opts);
  token.value = newToken;
};
</script>

<style scoped>
.organizations {
  display: flex;
  flex-wrap: wrap;
}

.org-card {
  cursor: pointer;
}

.org-card.selected {
  border: 2px solid orange;
}
</style>
