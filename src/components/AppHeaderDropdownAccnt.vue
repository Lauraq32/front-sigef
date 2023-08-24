<template>
	<CDropdown>
		<CDropdownToggle
			style="background-color: #eee"
			placement="bottom-end"
			class="py-0 d-flex align-items-center"
		>
			<span class="me-2"> {{ userName }}</span>
			<CAvatar :src="avatar" size="md" />
		</CDropdownToggle>
		<CDropdownMenu class="pt-0">
			<CDropdownItem @click="goToPerfil">
				<CIcon icon="cil-user" /> Perfil
			</CDropdownItem>
			<CDropdownDivider />
			<div @click="logOut">
				<CDropdownItem>
					<CIcon icon="cil-lock-locked" @click="logOut" /> Salir
				</CDropdownItem>
			</div>
		</CDropdownMenu>
	</CDropdown>
</template>

<script>
	import avatar from '@/assets/images/avatars/1.jpg';
	import router from '@/router';
	import { clearLoggedInfo } from '@/utils/logged-info';
	import { useAuthStore } from '@/store/AuthStore';
	import CIcon from '@coreui/icons-vue';
	export default {
		name: 'AppHeaderDropdownAccnt',
		setup() {
			const authStore = useAuthStore();
			const userName = authStore.authInfo.user.email;
			const goToPerfil = () => {
				router.push({ name: 'Perfil' });
			};
			const logOut = () => {
				clearLoggedInfo();
				router.push({ name: 'Login' });
			};
			return {
				avatar: avatar,
				logOut,
				userName,
				goToPerfil,
			};
		},
		components: { CIcon },
	};
</script>
