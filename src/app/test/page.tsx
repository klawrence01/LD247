const { data, error } = await supabase.from('sales_logs').select('*')
