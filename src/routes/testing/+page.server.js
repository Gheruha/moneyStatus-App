import { supabase } from '$lib/database/supabaseClient';

export async function load() {
    
	const { data } = await supabase.from('money').select();

	return {
		money: data ?? []
	};
}
